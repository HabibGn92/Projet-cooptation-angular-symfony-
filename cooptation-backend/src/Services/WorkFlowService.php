<?php

namespace App\Services;


use Symfony\Component\HttpFoundation\Request;
use App\Service\MessageGenerator;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Status;
use App\Entity\History;
use App\Entity\Cooptation;
use App\Repository\CooptationRepository;
use App\Repository\StatusRepository;
use App\Repository\HistoryRepository;
use DateTime;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use App\Repository\UserRepository;
use App\Repository\PoleRepository;

class WorkFlowService
{
    protected $entityManager;
    protected $cooptationRepo;
    private $security;
    protected $request;
    protected $statusRepository;
    protected $historyRepo;
    protected $path;
    protected $mailer;
    protected $userRepo;
    protected $poleRepo;

   public function __construct(EntityManagerInterface $entityManager,CooptationRepository $cooptationRepo, Security $security,HistoryRepository $historyRepo,
     MailerInterface $mailer, StatusRepository $statusRepository,UserRepository $userRepo, PoleRepository $poleRepo,$path)
   {
      $this->entityManager = $entityManager;
      $this->cooptationRepo = $cooptationRepo;
      $this->security = $security;
      $this->statusRepository = $statusRepository;
      $this->historyRepo=$historyRepo;
      $this->path = $path;
      $this->mailer=$mailer;
      $this->userRepo=$userRepo;
      $this->poleRepo=$poleRepo;

   }

    public function getHistory($id){
    $historyList= $this->historyRepo->findBy(["cooptation"  => $id]);
    $history=[];
        foreach( $historyList as $hist ){
            $statut= $hist->getStatus();
            $statutName= $statut->getName();
            $date= $hist->getDate();
            array_push($history, ['date' => $date, 'status' =>$statutName ]) ; 
        }
    return $history ; 
    }   

    
    public function addHistory($cooptation, $status){
        $newHistory = new History();
        $newHistory->setCooptation($this->cooptationRepo->find($cooptation))
                    ->setStatus($this->statusRepository->find($status))
                    ->setDate(new DateTime());
        $this->entityManager->persist($newHistory);
        $this->entityManager->flush();
    }


    public function can($cooptation_id,$desired_status){
        $content = json_decode(file_get_contents($this->getPath()));
        $history = $this->historyRepo->findBylast((int)$cooptation_id)[0];
        $status = $history->getStatus(); 
        $cooptation_status = $status->getId();
        foreach ($content as $key => $value) {
            if($key == $cooptation_status){
                $status = $value;
            }
         }
         foreach ($status as $key => $value) {
            if ($key == $desired_status) {
              return true;
            } 
         }
         return false;
    }

    public function getStatus($cooptation_id){
        $content = json_decode(file_get_contents($this->getPath()));
        $history = $this->historyRepo->findBylast((int)$cooptation_id)[0];
        $status = $history->getStatus(); 
        $cooptation_status = $status->getId();
        $res = [];
        foreach ($content as $key => $value) {
            if($key == $cooptation_status){
               foreach ($value as $k => $val) {
                array_push($res,["id" => $k, "status" => $val]);
               } 
            }
         }
         return $res;

    }

    public function getPath(){
        return $this->path;
    }

    public function sendEmail($cooptation){
        $coopt=$this->cooptationRepo->find($cooptation);
        $pole= $coopt->getPole();
        $users=$this->userRepo->findBy(['pole' => $pole]);
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