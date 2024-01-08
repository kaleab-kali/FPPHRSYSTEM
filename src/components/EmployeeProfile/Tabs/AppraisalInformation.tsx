import React from 'react'
import { Link } from 'react-router-dom'
import { DatabaseOutlined, WarningOutlined, SnippetsOutlined, TeamOutlined } from '@ant-design/icons'
import { Card, Progress, Table } from 'antd'

type Props = {}

const AppraisalInformation = ({ id }: { id: any }) => {
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


  return (
    <div>
        <span>AppraisalInformation{id}</span>
        <Card>
        <div className="flex flex-row  mt-4">
                <div className='w-2/3 '>
                    {/* <Table/> */}
                    <Card className='shadow-sm'>
                     <div className="flex flex-row ">

                     <div className="">

                        <span className='p-2   flex flex-row justify-between  text-slate-500 m-3  rounded-md font-sans'>
                            <div>
                                <span className='text-lg text-slate-600 font-bold'>Current Apriasl </span>
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
                                <span className='text-lg text-slate-600 font-bold'>Current status </span>
                                
                                <span className='bg-yellow-500 text-yellow-100 p-2 px-3 mx-3' >on pending</span>
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

                    
                    <Link to={'/'} className='p-5 flex flex-row justify-between  m-3 shadow-lg rounded-md bg-slate-100 font-sans'>
                        <div>
                            <span>{4}</span>
                            <br />
                            <span className='text-sm font-bold text-green-800'>pending Apraisals</span>
                        </div>
                        <div>
                            <span className='flex justify-end text-slate-400 text-2xl disabled '><DatabaseOutlined /></span>
                        </div>
                    </Link>

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
                    
                    <Link to={'/alltasks'} className='p-5 flex flex-row justify-between  m-3 shadow-lg rounded-md bg-green-200 font-sans'>
                        <div>
                            <span>{0}</span>
                            <br />
                            <span className='text-sm font-bold text-green-700'>Completed Apraisals</span>
                        </div>
                        <Progress type="circle" size="small" status='success' percent={100} />

                        <div>

                            <span className='flex justify-end text-slate-400 text-2xl disabled '><SnippetsOutlined /></span>
                        </div>
                    </Link>
                </div>
            </div>

            </Card>
    
    </div>
  )
}

export default AppraisalInformation