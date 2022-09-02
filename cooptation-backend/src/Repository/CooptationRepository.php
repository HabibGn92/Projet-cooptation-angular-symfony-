<?php

namespace App\Repository;

use App\Entity\Cooptation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Cooptation>
 *
 * @method Cooptation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cooptation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cooptation[]    findAll()
 * @method Cooptation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CooptationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cooptation::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Cooptation $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(Cooptation $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }


    /**
     * @return Cooptation[] Returns an array of Cooptation
     */
    public function findByPage($page)
    {
        return $this->createQueryBuilder('a')
            ->setFirstResult($page*10)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findStatus($value1,$value2): ?array
    {
        $entityManager = $this->getEntityManager();
        $dql = 'SELECT c from App\Entity\Cooptation c  
        LEFT JOIN c.histories h with (h.cooptation = c and h.id in (select max(h2.id) from App\Entity\History h2 where h2.cooptation = c ))
        LEFT JOIN h.status s with s = h.status
        Where s.id not in (:status2) ORDER BY h.status DESC, c.date DESC';
        $query = $entityManager->createQuery($dql);
        $query->setParameter('status2',[$value1,$value2]);
        return $query->getResult();
    }

    public function findStatusByPole($value): ?array
    {
        $entityManager = $this->getEntityManager();
        $dql = 'SELECT c from App\Entity\Cooptation c
        LEFT JOIN c.histories h with (h.cooptation = c and h.id in (select max(h2.id) from App\Entity\History h2 where h2.cooptation = c ))
        LEFT JOIN h.status s with s = h.status
        Where s.id in (:status2) ORDER BY c.date DESC';
        $query = $entityManager->createQuery($dql);
        $query->setParameter('status2',$value);
        return $query->getResult();
    }

    public function findOtherStatusByPole($value1,$value2): ?array
    {
        $entityManager = $this->getEntityManager();
        $dql = 'SELECT c from App\Entity\Cooptation c
        LEFT JOIN c.histories h with (h.cooptation = c and h.id in (select max(h2.id) from App\Entity\History h2 where h2.cooptation = c ))
        LEFT JOIN h.status s with s = h.status
        Where s.id not in (:status3) ORDER BY c.date DESC';
        $query = $entityManager->createQuery($dql);
        $query->setParameter('status3',[$value1,$value2]);
        return $query->getResult();
    }
    
}
