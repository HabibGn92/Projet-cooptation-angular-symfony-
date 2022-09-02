<?php

namespace App\Tests\Repository;

use App\Repository\CooptedEntityRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CooptedEntityRepositoryTest extends KernelTestCase {

    public function testCount() {
        self::bootKernel();
        $CooptedEntities = self::$container->get(CooptedEntityRepository::class)->count([]);
        $this->assertEquals(2,$CooptedEntities);
    }
} 