<?php

namespace App\Entity;

use App\Repository\CooptationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CooptationRepository::class)
 */
class Cooptation
{
    const MALE = 'Homme';
    const FEMALE = 'Femme';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Serializer\Groups({"History" , "cooptations"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"cooptations","export_excel","exp_mang" ,"exp_admin"})
     * @Assert\NotBlank(message="Votre nom est un champs obligatoire ")
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Votre prénom est un champs obligatoire ")
     * @Serializer\Groups({"cooptations","export_excel" ,"exp_mang","exp_admin"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"cooptations"})
     * @Assert\NotBlank
     */
    private $cv;

    /**
     * @ORM\Column(type="string")
     * @Serializer\Groups({"cooptations"})
     * @Assert\NotBlank
     */
    private $civility ;

    /**
     * @ORM\Column(type="integer")
     * @Serializer\Groups({"cooptations"})
     * @Assert\NotBlank
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"cooptations"}) 
     * @Assert\NotBlank
     */
    private $link;

    /**
     * @ORM\Column(type="string", length=255)
     * Assert\Email(['message' => ' "{{ value }}" n'est pas une adresse valide.' ])
     *  @Assert\NotBlank
     * @Serializer\Groups({"cooptations","exp_admin"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"cooptations"})
     */
    private $professional_experience;

    /**
     * @ORM\Column(type="date",nullable=true)
     * @Serializer\Groups({"cooptations","export_excel"})
     */
    private $application_date;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"cooptations"})
     */
    private $current_position;

    /**
     * @ORM\Column(type="date" ,nullable=true)
     * @Serializer\Groups({"cooptations"})
     */
    private $first_experience_date;

    /**
     * @ORM\Column(type="boolean")
     * @Serializer\Groups({"cooptations"})
     */
    private $fields_activity;


    /**
     * @ORM\Column(type="boolean")
     * @Serializer\Groups({"cooptations"})
     */
    private $key_figures;

    /**
     * @ORM\Column(type="date")
     *  @Assert\NotBlank
     * @Serializer\Groups({"cooptations"})

     */
    private $interview_date;

    /**
     * @ORM\Column(type="array")
     * @Serializer\Groups({"cooptations"})
     */
    private $geographical_wishes = [];

    /**
     * @ORM\Column(type="text")
     * @Serializer\Groups({"cooptations"})
     */
    private $comments;

    /**
     * @ORM\Column(type="text")
     * @Serializer\Groups({"cooptations"})
     */
    private $personality;

    /**
     * @ORM\Column(type="text")
     * @Serializer\Groups({"cooptations"})
     */
    private $skils;

    /**
     * @ORM\Column(type="text")
     * @Serializer\Groups({"cooptations"})
     */
    private $experience;


    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="cooptation")
     * @Serializer\Groups({"cooptations"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Pole::class, inversedBy="cooptations")
     * @Serializer\Groups({"cooptations"})
     */
    private $pole;

    /**
     * @ORM\Column(type="datetime")
     * @Serializer\Groups({"cooptations"})
     */
    private $date;

    /**
     * @ORM\OneToMany(targetEntity=History::class, mappedBy="cooptation")
   
     */
    private $histories;

    /**
     * @ORM\Column(type="boolean")
     * @Serializer\Groups({"cooptations"})
     */
    private $talan_values;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Serializer\Groups({"cooptations"})
     */
    private $interview_type;

    /**
     * @ORM\Column(type="float", nullable=true)
     *  @Serializer\Groups({"cooptations"})
     */
    private $fixed_desired_salary;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Serializer\Groups({"cooptations"})
     */
    private $variable_desired_salary;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Serializer\Groups({"cooptations"})
     */
    private $fixed_current_salary;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Serializer\Groups({"cooptations"})
     */
    private $variable_current_salary;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * * @Serializer\Groups({"cooptations"})
     */
    private $disponibilityDate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Serializer\Groups({"cooptations"})
     */
    private $secondComment;


    public function __construct()
    {
        $this->history = new ArrayCollection();
        $this->histories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getCv(): ?string
    {
        return $this->cv;
    }

    public function setCv(string $cv): self
    {
        $this->cv = $cv;

        return $this;
    }

    public function getCivility(): ?string
    {
        return $this->civility;
    }

    public function setCivility($civility)
    {
        if (!in_array($civility, array(self::MALE ,self::FEMALE))) {
            throw new \InvalidArgumentException("Invalid civility");
        }
        $this->civility = $civility;
        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(int $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getProfessionalExperience(): ?string
    {
        return $this->professional_experience;
    }

    public function setProfessionalExperience(string $professional_experience): self
    {
        $this->professional_experience = $professional_experience;

        return $this;
    }

    public function getApplicationDate(): ?\DateTimeInterface
    {
        return $this->application_date;
    }

    public function setApplicationDate(\DateTimeInterface $application_date): self
    {
        $this->application_date = $application_date;

        return $this;
    }

    public function getCurrentPosition(): ?string
    {
        return $this->current_position;
    }

    public function setCurrentPosition(string $current_position): self
    {
        $this->current_position = $current_position;

        return $this;
    }

    public function getFirstExperienceDate(): ?\DateTimeInterface
    {
        return $this->first_experience_date;
    }

    public function setFirstExperienceDate(\DateTimeInterface $first_experience_date): self
    {
        $this->first_experience_date = $first_experience_date;

        return $this;
    }

    public function getFieldsActivity(): ?bool
    {
        return $this->fields_activity;
    }

    public function setFieldsActivity(bool $fields_activity): self
    {
        $this->fields_activity = $fields_activity;

        return $this;
    }


    public function getKeyFigures(): ?bool
    {
        return $this->key_figures;
    }

    public function setKeyFigures(bool $key_figures): self
    {
        $this->key_figures = $key_figures;

        return $this;
    }

    public function getInterviewDate(): ?\DateTimeInterface
    {
        return $this->interview_date;
    }

    public function setInterviewDate(\DateTimeInterface $interview_date): self
    {
        $this->interview_date = $interview_date;

        return $this;
    }


    public function getGeographicalWishes(): ?array
    {
        return $this->geographical_wishes;
    }

    public function setGeographicalWishes(array $geographical_wishes): self
    {
        $this->geographical_wishes = $geographical_wishes;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(string $comments): self
    {
        $this->comments = $comments;

        return $this;
    }

    public function getPersonality(): ?string
    {
        return $this->personality;
    }

    public function setPersonality(string $personality): self
    {
        $this->personality = $personality;

        return $this;
    }

    public function getSkils(): ?string
    {
        return $this->skils;
    }

    public function setSkils(string $skils): self
    {
        $this->skils = $skils;

        return $this;
    }

    public function getExperience(): ?string
    {
        return $this->experience;
    }

    public function setExperience(string $experience): self
    {
        $this->experience = $experience;

        return $this;
    }


    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPole(): ?Pole
    {
        return $this->pole;
    }

    public function setPole(?Pole $pole): self
    {
        $this->pole = $pole;

        return $this;
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

    /**
     * @return Collection<int, History>
     */
    public function getHistories(): Collection
    {
        return $this->histories;
    }
  

    public function addHistory(History $history): self
    {
        if (!$this->histories->contains($history)) {
            $this->histories[] = $history;
            $history->setCooptation($this);
        }

        return $this;
    }

    public function removeHistory(History $history): self
    {
        if ($this->histories->removeElement($history)) {
            // set the owning side to null (unless already changed)
            if ($history->getCooptation() === $this) {
                $history->setCooptation(null);
            }
        }

        return $this;
    }

    public function getTalanValues(): ?bool
    {
        return $this->talan_values;
    }

    public function setTalanValues(bool $talan_values): self
    {
        $this->talan_values = $talan_values;

        return $this;
    }

    public function getInterviewType(): ?string
    {
        return $this->interview_type;
    }

    public function setInterviewType(?string $interview_type): self
    {
        $this->interview_type = $interview_type;

        return $this;
    }

    public function getFixedDesiredSalary(): ?float
    {
        return $this->fixed_desired_salary;
    }

    public function setFixedDesiredSalary(?float $fixed_desired_salary): self
    {
        $this->fixed_desired_salary = $fixed_desired_salary;

        return $this;
    }

    public function getVariableDesiredSalary(): ?float
    {
        return $this->variable_desired_salary;
    }

    public function setVariableDesiredSalary(?float $variable_desired_salary): self
    {
        $this->variable_desired_salary = $variable_desired_salary;

        return $this;
    }

    public function getFixedCurrentSalary(): ?float
    {
        return $this->fixed_current_salary;
    }

    public function setFixedCurrentSalary(?float $fixed_current_salary): self
    {
        $this->fixed_current_salary = $fixed_current_salary;

        return $this;
    }

    public function getVariableCurrentSalary(): ?float
    {
        return $this->variable_current_salary;
    }

    public function setVariableCurrentSalary(?float $variable_current_salary): self
    {
        $this->variable_current_salary = $variable_current_salary;

        return $this;
    }
    /**
     * 
     * @VirtualProperty()
     * @SerializedName("status")
     * @Serializer\Groups({ "cooptations"})
     */
    public function getLastStatus(){
        return  count($this->histories) > 0 ? $this->histories[count($this->histories)-1]->getStatus()->getName(): null;
    }

    public function getDisponibilityDate(): ?string
    {
        return $this->disponibilityDate;
    }

    public function setDisponibilityDate(?string $disponibilityDate): self
    {
        $this->disponibilityDate = $disponibilityDate;

        return $this;
    }

    public function getSecondComment(): ?string
    {
        return $this->secondComment;
    }

    public function setSecondComment(?string $secondComment): self
    {
        $this->secondComment = $secondComment;

        return $this;
    }

}
