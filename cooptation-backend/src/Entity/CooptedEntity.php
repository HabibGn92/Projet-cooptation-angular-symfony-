<?php

namespace App\Entity;

use App\Repository\CooptedEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CooptedEntityRepository::class)
 */
class CooptedEntity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Serializer\Groups({"cooptations","cooptedEntity","departement"})
    */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"cooptations","cooptedEntity"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Pole::class, mappedBy="cooptedEntity")
     * @Assert\NotBlank
     */
    private $pole;

    public function __construct()
    {
        $this->pole = new ArrayCollection();
        $this->coopted_entity = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }



    /**
     * @return Collection<int, Pole>
     */
    public function getPole(): Collection
    {
        return $this->pole;
    }

    public function addPole(Pole $pole): self
    {
        if (!$this->pole->contains($pole)) {
            $this->pole[] = $pole;
            $pole->setCooptedEntity($this);
        }

        return $this;
    }

    public function removePole(Pole $pole): self
    {
        if ($this->pole->removeElement($pole)) {
            // set the owning side to null (unless already changed)
            if ($pole->getCooptedEntity() === $this) {
                $pole->setCooptedEntity(null);
            }
        }

        return $this;
    }
}
