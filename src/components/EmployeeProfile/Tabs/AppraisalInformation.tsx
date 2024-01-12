import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DatabaseOutlined, WarningOutlined, SnippetsOutlined, TeamOutlined } from '@ant-design/icons'
import { Avatar, Card, List, Popover, Progress, Table } from 'antd'

type Props = {}
export interface EmployeeData {
    _id: string;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    name: string;
    email: string;
    requiredField: string;
    houseNumber: string;
    birthday: string;
    gender: string;
    position: string;
    department: string;
    ethnicity: string;
    region: string;
    subcity: string;
    wordea: string;
    camp?: string;
    salary: number;
    educationalLevel: string;
    relationship: string;
    leyuBota?: string;
    phone: {
      prefix: string;
      number: number;
    };
    motherInformation: {
      motherPhoneNumber: {
        prefix: string;
        number: number;
      };
      motherFirstName: string;
      motherMiddleName: string;
      motherLastName: string;
    };
    maritalStatus: {
      martialType: string;
      spouseInfo: {
        firstName: string;
        middleName: string;
        lastName: string;
        dob: Date;
        phoneNumber: {
          prefix: string;
          number: number;
        };
        address: {
          currentAddress: {
            region: string;
            subcity: string;
          };
        };
      };
      divorcedInfo: {
        divorceDate: Date;
      };
    };
  }
  
interface GeneralInformationProps {
    selectedEmployee?: EmployeeData; // Make selectedEmployee optional
  }
  
  function AppraisalInformation({ selectedEmployee }: GeneralInformationProps) {
// const AppraisalInformation = ({ id }: { id: any }) => {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const hide = () => {
      setOpen(false);
      setOpen1(false);
    };
  
    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
    };
    const handleOpenChange1 = (newOpen: boolean) => {
        setOpen1(newOpen);
      };
    const evaluationMark=[
        {
            content:"for  ",
            result:20,
            outOf:10

        },
        {
            content:"ለአግልግሎት ",
            result:15,
            outOf:15
        }, {
            content:"ለአመለላከት ",
            result:21,
            outOf:25

        }, {
            content:"Decepline ",
            result:25,
            outOf:17

        }, {
            content:"work performance ",
            result:25,
            outOf:10

        },
    ]
    const totalResults = evaluationMark.reduce((acc, emp) => acc + emp.result, 0);
    const totalOutOf = evaluationMark.reduce((acc, emp) => acc + emp.outOf, 0);
    const overallProgressPercent = (totalResults / totalOutOf) * 100;

    const data = [
        {
          title: 'Sagin',
          duration:"23-1-2000",
        },
        {
          title: 'general',
          duration:"23-1-2003",
        },
        {
          title: 'vice general',
          duration:"23-1-2002",
        },
        {
          title: 'colonel',
          duration:"23-1-2020",
        },
      ];
  return (
    <div>
        {/* <span>AppraisalInformation{id}</span> */}
        <Card>
        <div className="flex flex-row  mt-4">
                <div className='w-2/3 '>
                    {/* <Table/> */}
                    <Card className='shadow-sm'>
                     <div className="flex flex-row ">

                     <div className="">

                        <span className='p-2   flex flex-row justify-between  text-slate-500 m-3  rounded-md font-sans'>
                            <div>
                                <span className='text-lg text-slate-600 font-bold'>Current Title </span>
                                <br />
                                <span >General</span>
                            </div>
                            <div>
                            </div>
                         </span>
                         <span className='p-2 flex flex-row justify-between text-slate-500 mx-3  rounded-md font-sans'>
                            <div>
                                <span className='text-lg text-slate-600 font-bold'> የሚወዳደረበት ማዕረግ  </span>
                                <br />
                                <span >Main General</span>
                            </div>
                            <div>
                            </div>
                         </span>
                         <span className='p-2 flex flex-row justify-between text-slate-500 mx-3  rounded-md font-sans'>
                            <div>
                                <span className='text-lg text-slate-600 font-bold'>Role </span>
                                <br />
                                <span >Leader</span>
                            </div>
                            <div>
                            </div>
                         </span>
                         
                     </div>
                     <div className="p-3">
                     <span className=' flex flex-row justify-between text-slate-500 mx-3 shadow-md p-8  rounded-md font-sans'>
                            <div>
                                <span className='text-lg text-slate-600 font-bold mb-3'>Current status </span>
                                
                                <span className='bg-lightblue-500 text-blue-500 px-3 mx-3 mt' >Pending</span>
                            </div>
                            <div>
                            </div>
                         </span>
                         <span className=' flex flex-row justify-between mt-2 text-slate-500 mx-3 shadow-md p-8  rounded-md font-sans'>
                            <div>
                                <span className='text-lg text-slate-600 font-bold'>Apraisals accepted  date </span>
                                <br />
                                <span >jun,2022</span>
                            </div>
                            <div>
                            </div>
                         </span>
                    </div>
                    <div className="">
                    <Link to={'/'} className='p-11 ml-9 flex flex-col mt-7 justify-between  m-3 shadow-lg rounded-md bg-slate-100 font-sans'>
                        <div>
                            
                            <span className='text-sm font-bold text-green-800'>Total Evaluation out of 100%</span><br />
                        </div>
                        <br />
                        <Progress type="circle" size="small" status='normal' percent={totalOutOf} />

                        <div>

                            <span className='flex justify-end text-slate-400 text-2xl disabled '><SnippetsOutlined /></span>
                        </div>
                    </Link>
                    </div>
                 </div>
                        
                    </Card>
                   <div className=""><br /><br />
                        <span className=' text-lg   text-slate-500 p-2 px-3 w-full felx justify-center rounded-md'> Performace Evaluation for Apraisal</span>
                        <br />
                        <br />
                        <div className='flex flex-row '>

                        {
                            evaluationMark.map((emp)=>(
                               <div className="rounded-md bg-blue-50 p-4 shadow-md m-3 ">
                                <span className='font-bold'>{emp.result} <i className='text-slate-400 '>out of {emp.outOf}%</i> </span>
                                <br />

                                <br />
                                <span className='text-slate-600 font-bold'>{emp.content}</span>
                               </div>
                                ))
                            }
                        </div>
                    </div> 
                </div>
                <div className='flex flex-col w-1/3 overflow-y-scroll h-full'>

                    
                    <div className='p-5 flex flex-row justify-between  m-3 shadow-lg rounded-md bg-slate-100 font-sans'>
                        <div>
                            <span>{4}</span>
                            <br />
                            <span className='text-sm font-bold text-green-800'>pending Apraisals</span>
                        </div>
                        <div>
                            <span className='flex justify-end text-slate-400 text-2xl disabled '><DatabaseOutlined /></span>
                        </div>
                    </div>
                    <Popover
                     content={<>
                   <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="/">{item.title}</a>}
                            description={`approved this apraisal on date ${item.duration}`}
                            />
                        </List.Item>
                        )}
                    />
                     
                     <b className='bg-red-200 text-red-500 p-1 cursor-pointer px-2 rounded-sm' onClick={hide}>Close</b>
                     </>
                    
                    }
                     title={<span className='text-green-500 text-md shadow-lg p-3'>list of complated aprasal hostory</span>}
                     trigger="click"
                     open={open1}
                     onOpenChange={handleOpenChange1}

                    >

                    <span className='p-5 flex flex-row justify-between  m-3 shadow-lg rounded-md bg-red-100 font-sans'>
                        <div>
                            <span>5</span>
                            <br />
                            <span className='text-sm font-bold text-red-700'>Rejected Appraisals</span>
                        </div>
                        <div>
                            <span className='flex justify-end text-red-600 text-2xl disabled '><WarningOutlined /></span>
                        </div>
                    </span>
                    </Popover>
                    <Popover
                     content={<>
                   <List className='h-72   overflow-y-scroll'
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                        <List.Item >
                            <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="/">{item.title}</a>}
                            description={`approved this apraisal on date ${item.duration}`}
                            />
                        </List.Item>
                        )}
                    />
                     
                     <b className='bg-red-200 text-red-500 p-1 cursor-pointer px-2 rounded-sm' onClick={hide}>Close</b>
                     </>
                    
                    }
                     title={<span className='text-green-500 text-md shadow-lg p-3'>list of complated aprasal hostory</span>}
                     trigger="click"
                     open={open}
                     onOpenChange={handleOpenChange}

                    >

                    <div className='p-5 flex flex-row justify-between  m-3 shadow-lg rounded-md bg-green-200 font-sans'>
                        <div>
                            <span>{0}</span>
                            <br />
                            <span className='text-sm font-bold text-green-700'>Completed Apraisals</span>
                        </div>
                        
                        <Progress type="circle" size="small" status='success' percent={100} />

                        <div>

                            <span className='flex justify-end text-slate-400 text-2xl disabled '><SnippetsOutlined /></span>
                        </div>
                    </div>
                    </Popover>
                </div>
            </div>

            </Card>
    
    </div>
  )
}

export default AppraisalInformation