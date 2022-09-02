<?php

namespace App\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\CooptedEntityRepository;
/**
   * @Rest\Route("/api/cooptedentity", name="cooptedEntity")
   */
class CooptedEntityController extends AbstractController
{
    protected $entityManager;
   protected $cooptationRepo;

   public function __construct(EntityManagerInterface $entityManager,CooptedEntityRepository $cooptedEntityRepo)
   {
      $this->entityManager = $entityManager;
      $this->cooptedEntityRepo = $cooptedEntityRepo;
      
   }

   /**
   * @Rest\Get("/")
   * @Rest\View(serializerGroups={"cooptedEntity"})
   */
  public function getCooptedEntity()
  {
     return $this->cooptedEntityRepo->findAll();
  }  
}
