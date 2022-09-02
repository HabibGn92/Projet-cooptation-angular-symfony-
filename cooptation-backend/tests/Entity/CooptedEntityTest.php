<?php

namespace App\Tests\Entity;

use App\Entity\CooptedEntity;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CooptedEntityTest extends KernelTestCase {


    public function testValidEntity() {
        $Entity = (new CooptedEntity())
        ->setName("Talan Suisse");
        self::bootKernel();
        $error = self::$container->get("validator")->validate($Entity);
        $this->assertCount(0,$error);
    }

}