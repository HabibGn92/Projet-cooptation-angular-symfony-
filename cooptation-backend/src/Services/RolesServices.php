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
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\UserRepository;
use App\Repository\PoleRepository;
use App\Entity\History;
use App\Entity\Status;

use App\Repository\HistoryRepository;

class RolesServices
{
    protected $entityManager;
    protected $cooptationRepo;
    private $security;
    protected $serializer;
    protected $request;
    protected $statusRepo;
    protected $cooptedEntityRepo;
    protected $userRepo;
    protected $poleRepo;
    protected $historyRepo;
    protected $workFlowService;
   public function __construct(EntityManagerInterface $entityManager,CooptationRepository $cooptationRepo, Security $security,SerializerInterface $serializer,
          HistoryRepository $historyRepo, StatusRepository $statusRepository,CooptedEntityRepository $cooptedEntityRepository, UserRepository $userRepo, PoleRepository $poleRepo ,StatusRepository $statusRepo,
          WorkFlowService $workFlowService)

   {
    $this->entityManager = $entityManager;
    $this->cooptationRepo = $cooptationRepo;
    $this->security = $security;
    $this->serializer = $serializer;
    $this->statusRepo = $statusRepo;
    $this->cooptedEntityRepository = $cooptedEntityRepository;
    $this->userRepo=$userRepo;
    $this->poleRepo=$poleRepo;
    $this->historyRepo=$historyRepo;
    $this->workFlowService = $workFlowService;
   }

   public function getCooptationByManger(){ 

    $user = $this->security->getUser();
    $userRole = $user->getRoles();
    foreach( $userRole as $role ){
        if ($role === "ROLE_MANAGER"){
            $coopt=[];
            $pole= $user->getPole();
            $cooptations= $this->cooptationRepo->findStatusByPole(Status::STATUS_TWO);
            foreach( $cooptations as $cooptation){
                $cooptationPole=$cooptation->getPole();
                if($cooptationPole ==  $pole){
                           array_push($coopt, ['cooptation' => $cooptation,
                                               'actions' => $this->workFlowService->getStatus($cooptation->getId())]);
                }
            }
            return $coopt;
        }
        else if($role === "ROLE_ADMIN"){
            $coopt=[];
            $cooptations = $this->cooptationRepo->findStatus(Status::STATUS_ONE,Status::STATUS_TWO); 
            foreach( $cooptations as $cooptation){
                           array_push($coopt, ['cooptation' => $cooptation,
                                               'actions' => $this->workFlowService->getStatus($cooptation->getId())]);
            }
            return $coopt;
      }
    }
  }
  
    public function getCoopManger(){
        $user = $this->security->getUser();
        $userRole = $user->getRoles(); 
        foreach( $userRole as $role ){
            if ($role === "ROLE_MANAGER"){
                $pole= $user->getPole();
                $stat=$this->statusRepo->findBy(['id' => 2]);
                $his=$this->historyRepo->findBy(['status'=>$stat]);
                $coopt=[];
                foreach( $his as $history){
                    $cooptation=$history->getCooptation();
                    $cooptationPole=$cooptation->getPole();
                    if($cooptationPole ==  $pole){
                        array_push($coopt, ['cooptation' => $cooptation,
                                            'actions' => $this->workFlowService->getStatus($cooptation->getId())]);
                    } 
                }
                return $coopt ; 
            }
        }
        }

        public function getOtherStatusByPole(){ 

            $user = $this->security->getUser();
            $userRole = $user->getRoles();
            foreach( $userRole as $role ){
                if ($role === "ROLE_MANAGER"){
                    $coopt=[];
                    $pole= $user->getPole();
                    $cooptations= $this->cooptationRepo->findOtherStatusByPole(Status::STATUS_ONE,Status::STATUS_TWO);
                    foreach( $cooptations as $cooptation){
                        $cooptationPole=$cooptation->getPole();
                        if($cooptationPole ==  $pole){
                                   array_push($coopt, ['cooptation' => $cooptation,
                                                       'actions' => $this->workFlowService->getStatus($cooptation->getId())]);
                        }
                    }
                    return $coopt;
                }
            }
          }
}