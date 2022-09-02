<?php

namespace App\Tests\Repository;

use App\Repository\PoleRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class PoleRepositoryTest extends KernelTestCase {

    public function testCount() {
        self::bootKernel();
        $poles = self::$container->get(PoleRepository::class)->count([]);
        $this->assertEquals(2,$poles);
    }
} 