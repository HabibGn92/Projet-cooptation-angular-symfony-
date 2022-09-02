<?php

namespace  App\Services;

use PhpOffice\PhpSpreadsheet\IOFactory;
use JMS\Serializer\SerializationContext;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use JMS\Serializer\ArrayTransformerInterface;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class ExportService
{
  private CooptationService $cooptationservice ;

  /**
  * @var ArrayTransformerInterface
  */
  private $toArray;

  public function __construct( CooptationService $cooptationservice , string $temp_files , ArrayTransformerInterface $toArray)

{
    $this->cooptationservice=$cooptationservice;
    $this->temp_files = $temp_files;
    $this->toArray = $toArray;
}
    public function create($groups,$headers ,$rows)
    { 
        $spreadsheet = $this->creatSearchReport($groups,$headers ,$rows);
        $response = new StreamedResponse();
        $response->setCallback(function () use ($spreadsheet) {
            // $spreadsheet = //create you spreadsheet here;
            $writer = IOFactory::createWriter($spreadsheet, "Xlsx");
            $writer->save('php://output');
        });

        $response->setStatusCode(200);
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'download; filename="mes_cooptations.xls"');
        return $response;
    } 
    public function creatSearchReport( $groups ,$headers ,$rows)
    {

        $fileName = 'mes_cooptations' . date("Ymd_Hi") .'.xlsx';
        $filePath = $this->temp_files. $fileName;
        $spreadsheet = $this->CreateSpreadSheet('Cooptations');
        $this->setHeaders($spreadsheet->getActiveSheet(), $headers);
        $this->addDetailsReportsRows($spreadsheet->getActiveSheet(), $groups ,$rows);
        return $spreadsheet;
        
       
    } 
    public function CreateSpreadSheet(string $title){
        $spreadsheet = new Spreadsheet();
        $spreadsheet->getActiveSheet()->setTitle($title);
        return $spreadsheet;
    } 
    public function setHeaders(Worksheet $sheet, $headers)
    {
        $j = 1;
        $array = range('A', 'Z');
        foreach ($headers as $key => $header) {
            $sheet->setCellValueByColumnAndRow($j, 1, $header);
            $sheet->getColumnDimension($array[$j - 1])->setWidth(50);
            $j = $j + 1;
        }
        return $sheet;
    }
    public function addDetailsReportsRows(Worksheet $sheet, $groups, $rows)
    {
        $lineCount = 2;
        $rowData=$this->toArray->toArray(
            $rows,
            SerializationContext::create()->setGroups([$groups])
        );
       
            foreach ($rowData as $row) {
                $result = $this->getOrderRow($row);
                $sheet->fromArray(
                    $result,
                    Null, 'A' . $lineCount
                );
                $lineCount++;
            }
    }
    public function getOrderRow($row)
    {
        $orderRow = [
            "lastname" => $row['cooptation']['lastname'],
            "firstname" => $row['cooptation']['firstname'],
            "date" => date ("d/m/Y",strtotime($row['cooptation']['date'])),
            "status" => $row['cooptation']['status'],
        ];
       
        return $orderRow;
    }

    public function createCollab($groups,$headers ,$rows)
    { 
        $spreadsheet = $this->creatSearchReportCollab($groups,$headers ,$rows);
        $response = new StreamedResponse();
        $response->setCallback(function () use ($spreadsheet) {

            $writer = IOFactory::createWriter($spreadsheet, "Xlsx");
            $writer->save('php://output');
        });

        $response->setStatusCode(200);
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'download; filename="your_file.xls"');
        return $response;
    } 
    public function creatSearchReportCollab( $groups ,$headers ,$rows)
    {

        $fileName = 'mes_cooptations' . date("Ymd_Hi") .'.xlsx';
        $filePath = $this->temp_files. $fileName;
        $spreadsheet = $this->CreateSpreadSheet('Cooptations');
        $this->setHeaders($spreadsheet->getActiveSheet(), $headers);
        $this->addDetailsReportsRowsCollab($spreadsheet->getActiveSheet(), $headers , $groups ,$rows);
        return $spreadsheet;
        
       
    } 
  
    public function addDetailsReportsRowsCollab(Worksheet $sheet, $headers, $groups, $rows)
    {
        $lineCount = 2;
        $rowData=$this->toArray->toArray(
            $rows,
            SerializationContext::create()->setGroups([$groups])
        );
            foreach ($rowData as $row) {
                $result = $this->getOrderRowCollab($row);
                $sheet->fromArray(
                    $result,
                    Null, 'A' . $lineCount
                );
                $lineCount++;
            } 
        }
    public function getOrderRowCollab($row)
    { $orderRow = [
            "lastname" => $row['cooptation']['lastname'],
            "firstname" => $row['cooptation']['firstname'],
            "date" => date ("d/m/Y",strtotime($row['cooptation']['date'])),
            "status" => $row['status'],

        ];
       
        return $orderRow;
    }

}