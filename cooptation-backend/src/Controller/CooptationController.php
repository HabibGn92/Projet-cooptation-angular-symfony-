<?php

namespace App\Controller;

use DateTime;
use App\Entity\Cooptation;
use App\Services\ExportService;
use App\Services\RolesServices;
use App\Services\UploaderService;
use App\Repository\UserRepository;
use App\Services\CooptationService;
use App\Repository\StatusRepository;
use App\Repository\CooptationRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Request\ParamFetcher;
use App\Repository\CooptedEntityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Date;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Services\WorkFlowService;
 /**
   * @Rest\Route("/api/cooptation", name="cooptations")
   */
class CooptationController extends AbstractController
{   
   const headers = [
   'lastname' => 'Nom du coopté',
   'firstname' => 'Prénom du coopté',
   'date'=> " Date de soumission",
   'status'=> 'Statut de la cooptation ' ];

    public $cooptationService;
    public $exportservice;
    public $rolesservices;
    public $entityManager;
    public $cooptationRepo;
    public $workFlowService;
   public function __construct(WorkFlowService $workFlowService,CooptationRepository $cooptationRepo,CooptationService $cooptationService , ExportService $exportservice ,RolesServices $rolesservices , EntityManagerInterface $entityManager )
   {  $this->entityManager = $entityManager;
      $this->cooptationService = $cooptationService; 
      $this->exportservice = $exportservice;
      $this->rolesservices = $rolesservices;
      $this->cooptationRepo = $cooptationRepo;
      $this->workFlowService = $workFlowService; 
   }
  /**
   * @Rest\Get("/")
   * @Rest\View(serializerGroups={"cooptations"})
   */
   public function getallCooptations()
   {
      return $this->cooptationService->getAllCooptation();
   }

   /**
   * @Rest\Get("/user")
   * @Rest\View(serializerGroups={"cooptations"})
   */
   public function userCooptation()
   {
    return  $this->cooptationService->getUserCooptation();
   }
   /**
    * @Rest\Get("/export")
    */
    public function exportCooptation()
   {  
      $rows = $this->cooptationService->getUserCooptation();
     return  $this->exportservice->createCollab("cooptations", self::headers ,$rows);
   
   }
   
   /**
    * @Rest\Get("/exportmanager")
   * @Rest\View(serializerGroups={"cooptations"})
    */
    public function exportManager()
   { 
     $rows = $this->rolesservices->getCooptationByManger();
     return  $this->exportservice->create("cooptations" , self::headers , $rows);
   
   }
   
    /**
    * @Rest\Get("/exportstatus")
    */
    public function exportOtherStatus()
    { 
      $rows = $this->rolesservices->getOtherStatusByPole();
      return  $this->exportservice->create("cooptations" , self::headers , $rows);
    
    }

  /**
   * @Rest\Delete("/{id}")
   */
   public function deleteCooptation($id)

   {
      return $this->cooptationService->deleteCooptation($id);
   }

   /**
    * @Rest\FileParam(name="cv",description="cv du coopté")
    * @Rest\Post("")
    */
    public function saveCooptation(ParamFetcher $paramFetcher,Request $request,CooptationService $cooptationService)
   {
      $cv = $paramFetcher->get('cv');
      $cooptationService->saveCooptation($request,$cv,$this->getUser());
      $cooptationService->sendEmail($request);
      return $this->json(["message" => "cooptation added succesfully"],200);
   }

   /**
   * @Rest\Get("/pole/{id}")
   * @Rest\View(serializerGroups={"cooptedEntity"})
   */
  public function getPoleByEntityId(CooptationService $cooptationService, $id){
   return $this->cooptationService->getPoleByEntityId($id);
  }

    /**
   * @Rest\Get("/{id}")
   * @Rest\View(serializerGroups={"cooptations","History"})
   */
  public function userCooptationById($id){
  
   return $this->cooptationService->getUserCooptationById($id);
          
  }
  /**
   * @Rest\Get("/status/{id}")
   * @Rest\View(serializerGroups={"cooptations","History"})
   */
  public function CooptationById($id){
   $cooptation=[];
   $coop=$this->cooptationService->getUserCooptationById($id);
   $statut=$this->workFlowService->getStatus($id);
   array_push($cooptation, $coop,['actions'=>$statut] );
  
   return $cooptation ;
   }
  
    /**
   * @Rest\FileParam(name="cv",description="cv du coopté",nullable=true)
   * @Rest\Post("/{id}")
   */
  public function editCooptationCollab(ParamFetcher $paramFetcher,UploaderService $uploaderService,Request $request,CooptationService $cooptationService, $id=null) {
   $cv = $paramFetcher->get('cv');
   $cooptationService->editCooptation($request,$uploaderService, $cv,$this->getUser(),$id);

  return $this->json(["message" => "cooptation modified succesfully"],200);
  }   

}