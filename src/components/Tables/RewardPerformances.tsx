// import { Table } from 'antd';
import React from 'react'


type Props = {};

const RewardEvaluation:React.FC<any>  = (props: Props) => {
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
    //TODO add more data as needed
  ];

  return (
    <div>
      <span className='text-slate-500 m-4 text-lg mb-7'>Reward Evaluation</span>
      <br /><br /><br />
      <span  className='flex justify-center  m-4 bg-slate-600  text-slate-300  px-2 rounded-md  text-center cursor-pointer'
                    >Update  Employee's Reward Performance  </span>
     <div className="search-table-outter wrapper shadow-md rounded-xl  border-l-4  border-blue-500     mt-9">
     <table id="example" className="display nowrap p-5" style={{width:"100%"}}> 
	
          <tr className='text-slate-600 text-md bg-slate-200 font-bold ' style={{ textAlign: 'start' }}>
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
