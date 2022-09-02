<?php

namespace App\Controller;

use App\Entity\History;
use App\Repository\CooptationRepository;
use App\Repository\HistoryRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\historyRespository;
use App\Repository\StatusRepository;
use App\Services\WorkFlowService;
use DateTime;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
/**
   * @Rest\Route("/api/history", name="History")
   */
class WorkFlowController extends AbstractController
{
    public $workFlowService;
   public function __construct(WorkFlowService $workFlowService)
   {
      $this->workFlowService = $workFlowService; 
   }

   
  /**
   * @Rest\Get("/{id}")
   * @Rest\View(serializerGroups={"History"})
   */
   public function getHistoryById($id)
   {
      return $this->workFlowService->getHistory($id);
   }

   /**
   * @Rest\Post("")
   * @Rest\View(serializerGroups={"History"})
   */
  public function addHistory(Request $request){
      $cooptation_id = $request->get('cooptation_id');
      $status_id = $request->get('status_id');

      if ($this->workFlowService->can($cooptation_id,$status_id)) {
         $this->workFlowService->addHistory($cooptation_id,$status_id);
         return $this->json(["message" => "pass",200]);
      }
      else{
         return $this->json(["message" => "not allowed",401]);
      } 
  }
}
