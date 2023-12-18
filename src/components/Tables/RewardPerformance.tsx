// import { Table } from 'antd';
import React from 'react'


type Props = {};

const RewardEvaluation = (props: Props) => {
  const dataSource = [
    {
      key: '1',
      title: 'DR',
      name: 'Mike',
      age: 32,
      sex: 'M',
      role: 'dgaf sech',
      eduacationLevel: 'degree',
      forEducation: 10,
      forService: 9,
      amelekaket: 4,
      discipline: 24,
      performance: 4,
      total: 54,
      penality: 4,
      netPoint: 93,
      level: 2,
    },
    // Add more data as needed
  ];

  return (
    <div>
      <span className='text-slate-500 m-4 text-lg mb-7'>Reward Evaluation</span>
      <br /><br /><br />
      <span  className='flex justify-center  m-4 bg-slate-600  text-blue-400  px-2 rounded-md  text-center cursor-pointer'
                    >Update  Employee's Reward Performance  </span>
     <div className="search-table-outter wrapper shadow-md rounded-xl  border-l-4  border-blue-500     mt-9">
     <table id="example" className="display nowrap p-5" style={{width:"100%"}}> 
	
          <tr className='text-slate-600 text-lg bg-slate-200 font-bold ' style={{ textAlign: 'start' }}>
            <td>Title</td>

            <td>Full Name</td>
            <td>Competing Title</td>
            <td>Role</td>
            <td>Education Level</td>
            <td>For Education 10%</td>
            <td>For Service 15%</td>
            <td>leAmelekaket 5%</td>
            <td>Discipline 25%</td>
            <td>Work Performance 25%</td>
            <td>Total 100%</td>
            <td>Penalty</td>
            <td>Net Point 100%</td>
            <td>Examination</td>
          </tr>
          {/* <tr className='w-full'>
          <hr />

          </tr> */}
          {dataSource.map((data: any) => (
            <tr key={data.key} className='py-10 mb-10   text-slate-500' style={{ textAlign: 'start', margin: 32 }}>
              <td>{data.title}</td>
              <td>{data.name}</td>
              <td>{/* Competing Title */}</td>
              <td>{data.role}</td>
              <td>{data.eduacationLevel}</td>
              <td>{data.forEducation}</td>
              <td>{data.forService}</td>
              <td>{data.amelekaket}</td>
              <td>{data.discipline}</td>
              <td>{data.performance}</td>
              <td>{data.total}</td>
              <td>{data.penality}</td>
              <td>{data.netPoint}</td>
              <td>{/* Examination */}</td>
            </tr>
          ))}
        {/* </tbody> */}
        
      </table>
    </div>
    </div>
  );
};

export default RewardEvaluation;
// type Props = {}

// const RewardEvaluation = (props: Props) => {
//     const dataSource = [
//         {
//           key: '1',
//           title:'DR',
//           name: 'Mike',
//           age: 32,
//           sex:"M",
//           role:"dgaf sech",
//           eduacationLevel:"degree",
//           forEducation:10,
//             forService:9,

//           amelekaket:4,
//           discipline:24,
//           performance:4,
//           total:54,
//           penality:4,
//           netPoint:93,
//             level:2,

//         },
        
//       ];
      
//       const columns = [
//         {
//             title: 'Title',
//             dataIndex: 'title',
//             key: 'title',
//           },
//         {
//           title: 'Full Name',
//           dataIndex: 'name',
//           key: 'name',
//         },
//         {
//             title: 'Competing title',
//             dataIndex: 'Ctitle',
//             key: 'Ctitle',
//           },
//           {
//             title: 'Role',
//             dataIndex: 'role',
//             key: 'role',
//           },
//           {
//             title: 'Education level',
//             dataIndex: 'eduacationLevel',
//             key: 'eduacationLevel',
//           },
//           {
//             title: 'For Education 10%',
//             dataIndex: 'forEducation',
//             key: 'forEducation',
//             // width:50,
//           },
//           {
//             title: 'For service 15%',
//             dataIndex: 'forService',
//             key: 'forService',
//           },
//         {
//           title: 'leAmelekaket 5%',
//           dataIndex: 'amelekaket',
//           key: 'amelekaket',
//         },
//         {
//             title: 'discipline 25%',
//             dataIndex: 'discipline',
//             key: 'discipline',
//           },
//           {
//             title: 'Work performance 25%',
//             dataIndex: 'performance',
//             key: 'performance',
//           },
//           {
//               title: 'Total 100 %',
//               dataIndex: 'total',
//               key: 'total',
//             },
//           {
//             title: 'penality',
//             dataIndex: 'penality',
//             key: 'penality',
//           },
//           {
//             title: 'Net point 100%',
//             dataIndex: 'netPoint',
//             key: 'netPoint',
//           },
        
//           {
//             title: 'Examination',
//             dataIndex: 'examination',
//             key: 'examination',
//           },
        
//       ];
      
//       const tasks:any=[]
//   return (
//     <div>
//     <span className='text-slate-500 m-4 text-lg mb-7'>Reward Evaluation</span>
//     <div className=" overflow-x-auto">
//       <Table
//         dataSource={dataSource}
//         columns={columns}
//         scroll={{ x: true }}
//         className='shadow-xl mt-5 bg-slate-300 custom-table rounded-lg border-l-4 border-blue-500'
//       />

//         <table className='w-full h-full mt-5 text-center  '>
//           <tbody className='justify-around py-10 '>
//             <tr className='text-slate-600 text-md font-bold pt-4' style={{ textAlign: "start" }}>
//               <td>Title</td>
//               <td>Description</td>
//               <td>Deadline</td>
//               {<td>Action</td>}
//               <td>Status</td>
//               </tr>
//               {tasks && tasks.map((task:any) => (
//                 < >
//                 <tr key={task._id} className='py-10 mb-10 text-slate-500' style={{ textAlign: "start", margin: 32 }}>
//                 <td>{task.title}</td>
//                 <td>{task.description}</td>
//                 <td>{task.deadline ? new Date(task.deadline).toISOString().slice(0, 10) : ''}</td>
//                 </tr>
//                 </>
//                 ))}
//             </tbody>
//         </table>
                
//     </div>
//   </div>
//   )
// }

// export default RewardEvaluation
