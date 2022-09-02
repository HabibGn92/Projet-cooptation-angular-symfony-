<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploaderService {

    private $targetDirectory;

    public function __construct($targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
    }


    public function getUploadedFileName(UploadedFile $cv){
        $originalFilename = pathinfo($cv->getClientOriginalName(), PATHINFO_FILENAME);
        return $originalFilename.'-'.uniqid().'.'.$cv->guessExtension();

    }
    public function uploadCv(UploadedFile $cv,string $fileName)
    {
        $cv->move(
            $this->getTargetDirectory(),
            $fileName
        );
    }

    public function getTargetDirectory()
    {
        return $this->targetDirectory;
    }
}