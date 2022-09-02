<?php

namespace App\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\PoleRepository;

/**
   * @Rest\Route("/api/departement", name="departement")
   */
class PoleController extends AbstractController
{
    protected $entityManager;
    protected $poleRepo;

   
  public function __construct(EntityManagerInterface $entityManager,PoleRepository $poleRepo)
  {
     $this->entityManager = $entityManager;
     $this->poleRepo = $poleRepo;
     
  }
   /**
   * @Rest\Get("/")
   * @Rest\View(serializerGroups={"departement"})
   */
  public function getCooptedEntity()
  {
     return $this->poleRepo->findAll();
  }  
}
