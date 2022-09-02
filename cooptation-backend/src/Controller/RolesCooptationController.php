<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Cooptation;
use Symfony\Component\Security\Core\Security;
use App\Services\CooptationService;
use App\Services\RolesServices;
use Symfony\Component\Serializer\SerializerInterface;

 /**
   * @Rest\Route("/api/roles", name="roles")
   */
class RolesCooptationController extends AbstractController
{
    public $rolesService;
    public function __construct(RolesServices $rolesService)
    {
       $this->rolesService = $rolesService; 
    }
   /**
   * @Rest\Get("/manager")
   * @Rest\View(serializerGroups={"cooptations"})
   */
  public function getCooptationByManger(){
    return $this->rolesService->getCooptationByManger();
   }
    /**
   * @Rest\Get("/testmanager")
   * @Rest\View(serializerGroups={"cooptations"})
   */
  public function getCoopManger(){
   return $this->rolesService->getCoopManger();
}
   /**
   * @Rest\Get("/")
   * @Rest\View(serializerGroups={"cooptations"})
   */
  public function getOtherStatusByPole(){
   return $this->rolesService->getOtherStatusByPole();
  }
}
