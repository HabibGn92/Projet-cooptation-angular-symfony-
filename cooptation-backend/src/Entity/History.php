<?php

namespace App\Entity;

use App\Repository\HistoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ORM\Entity(repositoryClass=HistoryRepository::class)
 */
class History
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Serializer\Groups({"cooptations"})
     */
    private $id;


    /**
     * @ORM\Column(type="datetime")
     * @Serializer\Groups({"History","cooptations"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=Cooptation::class, inversedBy="histories")
     * @Serializer\Groups({"History","cooptations","export_excel"})
     */
    private $cooptation;

    /**
     * @ORM\ManyToOne(targetEntity=Status::class, inversedBy="history")
     * @Serializer\Groups({"History","export_excel","cooptations"})
     */
    private $status;




    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getCooptation(): ?Cooptation
    {
        return $this->cooptation;
    }

    public function setCooptation(?Cooptation $cooptation): self
    {
        $this->cooptation = $cooptation;

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

        return $this;
    }



}
