<?php

namespace App\Tests\Repository;

use App\Repository\CooptationRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CooptationRepositoryTest extends KernelTestCase {

    public function testCount() {
        self::bootKernel();
        $Cooptations = self::$container->get(CooptationRepository::class)->count([]);
        $this->assertEquals(10,$Cooptations);
    }
} 