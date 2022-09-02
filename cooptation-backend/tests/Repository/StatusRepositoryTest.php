<?php

namespace App\Tests\Repository;

use App\Repository\StatusRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class StatusRepositoryTest extends KernelTestCase {

    public function testCount() {
        self::bootKernel();
        $status = self::$container->get(StatusRepository::class)->count([]);
        $this->assertEquals(16,$status);
    }
}