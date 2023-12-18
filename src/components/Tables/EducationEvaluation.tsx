// import { Table } from 'antd';
import React from 'react';

type Props = {};

const EducationEvaluation = (props: Props) => {
  const dataSource = [
    {
      key: '1',
      title: 'DR',
      name: 'Mike',
      age: 32,
      sex: 'M',
      Educational_P: 7,
      Averagescore: 5,
      experiance: 10,
      performance: 9,
      quality: 4,
      total: 54,
      level: 2,
    },
    // Add more data as needed
  ];

  return (
    <div>
      <span className='text-slate-500 m-4 text-lg mb-7'>Education Evaluation</span>
      <br /><br /><br />
      <span  className='flex justify-center  m-4 bg-slate-600  text-blue-400  px-2 rounded-md  text-center cursor-pointer'
                    >Update  Employee's Education Performance  </span>
     <div className="search-table-outter wrapper shadow-md rounded-xl  border-l-4  border-blue-500     mt-9">
     <table id="example" className="display nowrap p-5" style={{width:"100%"}}> 
          <tbody className='justify-around py-10'>
            <tr className='text-slate-600 bg-slate-200 text-md font-bold pt-4' style={{ textAlign: 'start' }}>
              <td>Title</td>
              <td>Full Name</td>
              <td>Sex</td>
              <td>Educational preparation 30%</td>
              <td>Average score 10%</td>
              <td>Work experience & service 25%</td>
              <td>Work performance 30%</td>
              <td>Archive Quality 5%</td>
              <td>Total 100%</td>
              <td>Level</td>
              <td>Examination</td>
            </tr>
            {dataSource.map((data: any) => (
              <tr key={data.key} className='py-10 mb-10 text-slate-500' style={{ textAlign: 'start', margin: 32 }}>
                <td>{data.title}</td>
                <td>{data.name}</td>
                <td>{data.sex}</td>
                <td>{data.Educational_P}</td>
                <td>{data.Averagescore}</td>
                <td>{data.experiance}</td>
                <td>{data.performance}</td>
                <td>{data.quality}</td>
                <td>{data.total}</td>
                <td>{data.level}</td>
                <td>{/* Examination */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EducationEvaluation;


// type Props = {}

// const EducationEvaluation = (props: Props) => {
//     const dataSource = [
//         {
//           key: '1',
//           title:'DR',
//           name: 'Mike',
//           age: 32,
//           sex:"M",
//           Educational_P:7,
//           Averagescore:5,
//           experiance:10,
//             performance:9,
//           quality:4,
//             total:54,
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
//             title: 'Sex',
//             dataIndex: 'sex',
//             key: 'sex',
//           },
//           {
//             title: 'Educational preparation 30%',
//             dataIndex: 'Educational_P',
//             key: 'Educational_P',
//           },
//           {
//             title: 'Average score 10%',
//             dataIndex: 'Averagescore',
//             key: 'Averagescore',
//           },
//           {
//             title: 'Work experience & service 25%',
//             dataIndex: 'experiance',
//             key: 'experiance',
//             width:50,
//           },
//           {
//             title: 'Work performance 30%',
//             dataIndex: 'performance',
//             key: 'performance',
//           },
//         {
//           title: 'Archive Quality 5%',
//           dataIndex: 'quality',
//           key: 'quality',
//         },
//         {
//             title: 'Total 100 %',
//             dataIndex: 'total',
//             key: 'total',
//           },
//           {
//             title: 'Level',
//             dataIndex: 'level',
//             key: 'level',
//           },
//           {
//             title: 'Examination',
//             dataIndex: 'examination',
//             key: 'examination',
//           },
        
//       ];
      
      
//   return (
//       <div>
//         <span className='text-slate-500 m-4 text-lg mb-7'>Eduaction Evaluation</span>
//         <div className="w-full overflow-x-scroll ">


//         <Table  dataSource={dataSource} columns={columns} scroll={{ x: true }}  className='shadow-xl mt-5 bg-slate-300 custom-table  rounded-lg border-l-4 border-blue-500' />;
//         </div>
//     </div>
//   )
// }

// export default EducationEvaluation