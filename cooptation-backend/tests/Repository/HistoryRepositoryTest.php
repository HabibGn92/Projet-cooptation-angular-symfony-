<?php

namespace App\Tests\Repository;

use App\Repository\HistoryRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class HistoryRepositoryTest extends KernelTestCase {

    public function testCount() {
        self::bootKernel();
        $histories = self::$container->get(HistoryRepository::class)->count([]);
        $this->assertEquals(2,$histories);
    }
}