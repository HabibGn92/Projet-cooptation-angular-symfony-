<?php

namespace App\Tests\Entity;

use App\Entity\Cooptation;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CooptationTest extends KernelTestCase {

    public function testValidEntity() {
        $cooptation = (new Cooptation())
        ->setLastname("Samar")
        ->setFirstname("Cherni")
        ->setCivility("Femme")
        ->setCv($uploaderService->getUploadedFileName($uploadedFile))
        ->setPhone("21581021")
        ->setLink("Familial")
        ->setEmail("samar@talan.com")
        ->setProfessionalExperience("")
        ->setCurrentPosition("")
        ->setFieldsActivity("")
        ->setTalanValues("")
        ->setKeyFigures("")
        ->setInterviewDate(new DateTime(23-12-2022))
        ->setInterviewType("")
        ->setGeographicalWishes([""])
        ->setComments("")
        ->setSecondComment("")
        ->setPersonality("")
        ->setSkils("")
        ->setDisponibilityDate("")
        ->setExperience("")
        ->setFixedDesiredSalary("")
        ->setFixedCurrentSalary("")
        ->setVariableCurrentSalary("")
        ->setVariableDesiredSalary("")
        ->setUser(1)
        ->setPole(1)
        ->setDate(new DateTime());
        self::bootKernel();
        $error = self::$container->get("validator")->validate($cooptation);
        $this->assertCount(0,$error);
    }

    public function testInvalidEntity() 
    {
        $ucooptation = (new Cooptation())
        ->setEmail("habi")
        ->setPassword("")
        ->setName("")
        ->setRoles(["ROLE_USER"]);
        self::bootKernel();
        $error = self::$container->get("validator")->validate($cooptation);
        $this->assertCount(3,$error);
    }

}