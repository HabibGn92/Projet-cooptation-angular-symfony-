<?php

namespace App\Services;

use App\Entity\Cooptation;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use App\Service\MessageGenerator;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CooptationRepository;
use App\Repository\CooptedEntityRepository;
use App\Repository\StatusRepository;
use DateTime;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use App\Repository\UserRepository;
use App\Repository\PoleRepository;
use App\Entity\History;
use App\Repository\HistoryRepository;


class CooptationService
{
    protected $entityManager;
    protected $cooptationRepo;
    private $security;
    protected $serializer;
    protected $request;
    protected $statusRepository;
    protected $cooptedEntityRepository;
    protected $mailer;
    protected $userRepo;
    protected $poleRepo;
    protected $historyRepo;
    protected $uploaderService;
   
 
   public function __construct(EntityManagerInterface $entityManager,CooptationRepository $cooptationRepo, Security $security,SerializerInterface $serializer,
          HistoryRepository $historyRepo, StatusRepository $statusRepository,CooptedEntityRepository $cooptedEntityRepository, MailerInterface $mailer, UserRepository $userRepo, PoleRepository $poleRepo,
          UploaderService $uploaderService )
   {
      $this->entityManager = $entityManager;
      $this->cooptationRepo = $cooptationRepo;
      $this->security = $security;
      $this->serializer = $serializer;
      $this->statusRepository = $statusRepository;
      $this->cooptedEntityRepository = $cooptedEntityRepository;
      $this->mailer=$mailer;
      $this->userRepo=$userRepo;
      $this->poleRepo=$poleRepo;
      $this->historyRepo=$historyRepo;
      $this->uploaderService = $uploaderService;
      
     
   }
   public function getCooptation($page)
    {
        return $this->cooptationRepo->findByPage($page);
    }
    public function getAllCooptation()
    {
        return $this->cooptationRepo->findAll();
    }

   

   public function getUserCooptation()
    {
        $user = $this->security->getUser();
        $userId = $user->getId(); 
        $cooptationList=$this->cooptationRepo->findBy(['user' => $userId],['date' => 'DESC']);
        $coopt=[];
        foreach( $cooptationList as $cooptation ){
            $cooptationId=$cooptation->getId();
            $history=$this->historyRepo->findBylast($cooptationId);
            $statut= $history[0]->getStatus();
            $statutName= $statut->getName();
            
           array_push($coopt, ['cooptation' => $cooptation, 'status' =>$statutName ]) ; 

        }
        return $coopt ; 
    }
    public function getcolabcooptation()
    {
        $user = $this->security->getUser();
        $userId = $user->getId(); 
        $coopt =$this->cooptationRepo->findBy(['user' => $userId],['date' => 'DESC']);
        return $coopt ; 
    }
   

   public function getUserCooptationById($id)
    {   
        $cooptation=$this->cooptationRepo->findBy(['id' => $id]);
        $pole=$cooptation[0]->getPole()->getId();
        $poles=$this->poleRepo->findBy(['id' => $pole]);
        $poleName=$poles[0]->getName();
        $poleId=$poles[0]->getId();
        $entity=$poles[0]->getCooptedEntity()->getId();
        $cooptedEntity=$this->cooptedEntityRepository->findBy(['id' => $entity]);
        $entityName=$cooptedEntity[0]->getName();
        $entityId=$cooptedEntity[0]->getId();  
        $coopt=[];
        array_push($coopt, ['cooptation' => $cooptation, 'pole' =>$poleName, 'cooptedEntity' =>$entityName ,'entityId'=>$entityId ,'poleId'=>$poleId]) ;
    
        return $coopt ; 

    }

    public function deleteCooptation($id)
    {
    $cooptation = $this->cooptationRepo->find($id);
    if(!$cooptation){
        return new JsonResponse("cooptation not found");
    }

    $histrory=$this->historyRepo->findBy(['cooptation'=>$cooptation]);
    foreach( $histrory as $history){
        if($history->getStatus()->getId()!=1){
            return new JsonResponse("error");
    }

    $this->entityManager->remove($history);
    $this->entityManager->flush($history);
    }

    $this->entityManager->remove($cooptation);
    $this->entityManager->flush($cooptation);
    return new JsonResponse("deleted");
}


public function saveCooptation(Request $request,$uploadedFile,$connectedUser)
{
    $newCooptation = new Cooptation();
    $newCooptation->setFirstname($request->get('lastname'))
                    ->setLastname($request->get('username'))
                    ->setCivility($request->get('civility'))
                    ->setCv($this->uploaderService->getUploadedFileName($uploadedFile))
                    ->setPhone($request->get('phone'))
                    ->setLink($request->get('link'))
                    ->setEmail($request->get('email'))
                    ->setProfessionalExperience($request->get('professionalExperience'))
                    ->setCurrentPosition($request->get('currentPosition'))
                    ->setFieldsActivity($request->get('fieldActivities'))
                    ->setTalanValues($request->get('values'))
                    ->setKeyFigures($request->get('keyfiguers'))
                    ->setInterviewDate(new DateTime($request->get('interview_date')))
                    ->setInterviewType($request->get('interview_type'))
                    ->setGeographicalWishes([$request->get('geographicalWishes')])
                    ->setComments($request->get('comments'))
                    ->setSecondComment($request->get('secondcomments'))
                    ->setPersonality($request->get('character'))
                    ->setSkils($request->get('skills'))
                    ->setDisponibilityDate($request->get('DisponibilityDate'))
                    ->setExperience($request->get('experience'))
                    ->setFixedDesiredSalary( $request->get('desiredsalary') ? (int)$request->get('desiredsalary') : null )
                    ->setFixedCurrentSalary( $request->get('currentsalary') ? (int)$request->get('currentsalary')  : null )
                    ->setVariableCurrentSalary($request->get('variable_currentsalary') ? (int)$request->get('variable_currentsalary') : null)
                    ->setVariableDesiredSalary($request->get('variable_desiredsalary') ? (int)$request->get('variable_desiredsalary')  :null )
                    ->setUser($connectedUser)
                    ->setPole($this->poleRepo->find((int)$request->get('departement')))
                    ->setDate(new DateTime());
    
    if($request->get('applicationDate')!=''){
        $newCooptation->setApplicationDate(new DateTime($request->get('applicationDate')));
    }
    if($request->get('firstExperienceDate')!=''){
        $newCooptation->setFirstExperienceDate(new DateTime($request->get('firstExperienceDate')));
    }

    $status = $this->statusRepository->find((int)$request->get('postType'));
    $history = new History();
    $history->setCooptation($newCooptation)
            ->setStatus($this->statusRepository->find($status))
            ->setDate(new DateTime());

    $this->entityManager->persist($newCooptation);
    $this->entityManager->persist($history);
    $this->entityManager->flush();   
    $this->uploaderService->uploadCv($uploadedFile,$newCooptation->getCv());
}

   public function sendEmail(Request $request){
        $pole= $this->poleRepo->find((int)$request->get('departement'));
        $status = $this->statusRepository->find((int)$request->get('postType'));
        $statusId=$status->getId();
        $users=$this->userRepo->findBy(['pole' => $pole]);
        if ($statusId === 2){
        foreach( $users as $user ){
            $userRole=$user->getRoles();
            foreach( $userRole as $role ){
           	    if ($role === "ROLE_MANAGER"){
            	    $managerEmail=$user->getEmail(); 
                    $email = (new Email())
                        ->from('admin@admin.com')
                        ->to($managerEmail)
                        ->subject('Bonjour')
                        ->text('Bonjour, Vous avez une nouvelle demande de cooptation à consulter. Cordialement ')
                        ->html('<p>Bonjour, </p> <p>Vous avez une nouvelle demande de cooptation à consulter.</p> <p>Cordialement. </p> '); 
                        $this->mailer->send($email); 

                    }
                 }
            }
        }
    }



    public function editCooptation(Request $request,UploaderService $uploaderService,$uploadedFile = null,$connectedUser,$id=null){
                
        $firstName = $request->get('lastname');
        $lastName = $request->get('username');
        $civility = $request->get('civility');
        $phone = $request->get('phone');
        $link = $request->get('link');
        $email = $request->get('email');
        $application_date = $request->get('applicationDate');
        $professional_experience = $request->get('professionalExperience');
        $current_position = $request->get('currentPosition');
        $first_experience_date = $request->get('firstExperienceDate');
        $fields_activity = $request->get('fieldActivities');
        $keyfiguers = $request->get('keyfiguers');
        $values = $request->get('values');
        $disponibility_date=$request->get('DisponibilityDate');
        $interview_date = $request->get('interview_date');
        $interview_type = $request->get('interview_type');
        $geographical_wishes = $request->get('geographicalWishes');
        $comments = $request->get('comments');
        $second_comment=$request->get('secondcomments');
        $personality = $request->get('character');
        $skils = $request->get('skills');
        $experience = $request->get('experience');
        $desired_salary = $request->get('desiredsalary');
        $variable_desired_salary = $request->get('variable_desiredsalary');
        $current_salary = $request->get('currentsalary');
        $variable_current_salary = $request->get('variable_currentsalary');
        $departement = $this->poleRepo->find((int)$request->get('departement'));
        $status = $this->statusRepository->find((int)$request->get('postType'));
        
        $cooptation = $this->cooptationRepo->find($id);
            if(!$cooptation){
                return new JsonResponse("cooptation not found",404);
            }
        
            
            $cooptation->setFirstname($firstName)
                            ->setLastname($lastName)
                            ->setCivility($civility)
                            ->setPhone($phone)
                            ->setLink($link)
                            ->setEmail($email)
                            ->setProfessionalExperience($professional_experience)
                            ->setCurrentPosition($current_position)
                            ->setFieldsActivity($fields_activity)
                            ->setTalanValues($values)
                            ->setKeyFigures($keyfiguers)
                            ->setInterviewDate(new DateTime($interview_date))
                            ->setInterviewType($interview_type)
                            ->setGeographicalWishes([$geographical_wishes])
                            ->setComments($comments)
                            ->setSecondComment($second_comment)
                            ->setPersonality($personality)
                            ->setSkils($skils)
                            ->setExperience($experience)
                            ->setDisponibilityDate($disponibility_date)
                            ->setFixedDesiredSalary($desired_salary?(int)$desired_salary:null)
                            ->setFixedCurrentSalary($current_salary?(int)$current_salary:null)
                            ->setVariableCurrentSalary($variable_current_salary?(int)$variable_current_salary:null)
                            ->setVariableDesiredSalary((int)$variable_desired_salary?(int)$variable_desired_salary:null)
                            ->setUser($connectedUser)
                            ->setPole($departement)
                            ->setDate(new DateTime());
                 if($application_date!=''){
                    $cooptation->setApplicationDate(new DateTime($application_date));
                            }
                 if($first_experience_date!=''){
                    $cooptation->setFirstExperienceDate(new DateTime($first_experience_date));
                            }
                    if($uploadedFile != null){
                        $cooptation->setCv($uploaderService->getUploadedFileName($uploadedFile));
                 }
             
                $this->entityManager->persist($cooptation);
                $this->entityManager->flush();  
                if($uploadedFile != null){
                    $uploaderService->uploadCv($uploadedFile,$cooptation->getCv());
                }
                $statusId=$status->getId();
                if ($statusId == 2){               
                $history = new History();
                $history->setCooptation($cooptation)
                        ->setStatus($this->statusRepository->find($status))
                        ->setDate(new DateTime());
                        $this->entityManager->persist($history);
                        $this->entityManager->flush();  
                     }
              
                return new JsonResponse("cooptation modified");  
        
    }
    
    public function getPoleByEntityId($id){
        return $this->poleRepo->findBy(['cooptedEntity' => $id]);
    }
}
      

