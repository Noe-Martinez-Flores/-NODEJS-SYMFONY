<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Office;

/**
 * Employee
 *
 * @ORM\Table(name="employee", indexes={@ORM\Index(name="fk_employee_office_idx", columns={"id_office"})})
 * @ORM\Entity
 */
class Employee
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=45, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="address", type="string", length=45, nullable=false)
     */
    private $address;

    /**
     * @var string
     *
     * @ORM\Column(name="salary", type="decimal", precision=2, scale=0, nullable=false)
     */
    private $salary;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="registered", type="datetime", nullable=false)
     */
    private $registered;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime", nullable=false)
     */
    private $updated;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status;

    /**
     * @var \Office
     *
     * @ORM\ManyToOne(targetEntity="Office")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_office", referencedColumnName="id")
     * })
     */
    private $idoffice;

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getSalary(): ?string
    {
        return $this->salary;
    }

    public function setSalary(string $salary): self
    {
        $this->salary = $salary;

        return $this;
    }

    public function getRegistered(): ?\DateTimeInterface
    {
        return $this->registered;
    }

    public function setRegistered(\DateTimeInterface $registered): self
    {
        $this->registered = $registered;

        return $this;
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

   
    
    public function getIdOffice():?Office
    {
        return $this->idoffice;
    }

    public function setIdOffice(?Office $idoffice): self
    {
        $this->idoffice = $idoffice;

        return $this;
    }


}
