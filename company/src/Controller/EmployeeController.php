<?php

namespace App\Controller;
header('Access-Control-Allow-Origin: *');
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use \DateTime;
use App\Entity\Office;
use Doctrine\ORM\Mapping\Id;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EmployeeController extends AbstractController
{
    
    public function findAllEmployee()
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT e.id, e.name,e.address,e.salary,e.registered,e.updated,e.status,IDENTITY (e.idoffice) FROM App:Employee e');
        $listEmployee = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'No se han encontrando ningun resultados'
        ];

        if(count($listEmployee) > 0)
        {
            $data = [
                'status' => 200,
                'message' => 'Se han encontrado '.count($listEmployee).' resultados',
                'listEmployee' => $listEmployee
            ];
        }
        return new JsonResponse($data);
    }

    public function findEmployeeById ($id) 
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em -> createQuery('SELECT e.id, e.name,e.address,e.salary,e.registered,e.updated,e.status,IDENTITY (e.idoffice) FROM App:Employee e WHERE e.id = :e');
        $query -> setParameter(':e',$id);
        $employee = $query -> getResult();

        $data = [
            'status' => 200,
            'message' => 'Se ha realizado la busqueda con exito',
            'employee' => $employee
        ];
        return new JsonResponse($data);
    }

    public function createEmployee (Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $day = new DateTime();
        $day->format('Y-m-d H:i:s');
        $name = $request -> get ('name',null);
        $address = $request -> get ('address',null);
        $salary = $request -> get ('salary',0);
       
        
        
        $idoffice = $request -> get ('idoffice');
        $office = $this->getDoctrine()->getRepository('App:Office')->find($idoffice);
        

        $employee = new \App\Entity\Employee;
        $employee -> setName( $name);
        $employee -> setAddress( $address);
        $employee -> setSalary( $salary);
        $employee -> setRegistered( $day);
        $employee -> setUpdated( $day);
        $employee -> setIdOffice($office);
        $employee -> setStatus(1);

        $em-> persist($employee);
        
        $em -> flush();
        
        $data = [
            'status' => 200,
            'message' => 'registro Completado'
        ];

        return new JsonResponse($data);
    }

    public function updateEmployee (Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $day = new DateTime();
        $day->format('Y-m-d H:i:s');
        $name = $request -> get ('name',null);
        $address = $request -> get ('address',null);
        $salary = $request -> get ('salary',0);

        $query = $em ->createQuery ('UPDATE App:Employee e SET e.name = :name,e.address = :address,e.salary = :salary ,e.updated = :updated WHERE e.id = :id');
        $query -> setParameter(':name',$name);
        $query -> setParameter(':address',$address);
        $query -> setParameter(':salary',$salary);
        $query -> setParameter(':updated',$day);
        $query -> setParameter(':id',$id);

        $flag = $query -> getResult();

        if($flag == 1)
        {
            $data = [ 'status' => 200, 'message' => 'Actualización del producto con el ID > '.$id.' Exitosa'];
        }
        else
        {
            $data = [ 'status' => 400, 'message' => 'Ocurrio un Error'];
        }
        return new JsonResponse($data);
    }
    
    public function deleteEmployee ($id)
    {
        $em = $this->getDoctrine()->getManager();
        $employee = $em -> getRepository('App:Employee') -> findOneBy(['id' => $id]);
        $employee -> setStatus(0);
        $em -> persist($employee);
        $em -> flush();

        $data = [
            'status' => 200,
            'message' => 'Employee Dado de Baja',
            'employee' => $employee
        ];
         return new JsonResponse($data);
    }
}
