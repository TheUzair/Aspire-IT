import React, { useState, useEffect, useContext } from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import '../App.css';
import AttendanceCharts from './AttendanceCharts';
import CaregiversCharts from './CaregiversCharts';
import ChildrenCharts from './ChildrenCharts';
import EnrollmentCharts from './EnrollmentCharts';
import AttendanceModal from './AttendanceModal';
import { ThemeContext } from '../context/ThemeContext';

const Dashboard = () => {
  // State variables for dynamic data
  const [childrenData, setChildrenData] = useState([]);
  const [caregiversData, setCaregiversData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([])
  const [financialData, setFinancialData] = useState({});
  const [predictAttandance, setPredictAttandance] = useState([])
  const [childrenSelectedYear, setChildrenSelectedYear] = useState('2024');
  const [caregiversSelectedYear, setCaregiversSelectedYear] = useState('2024');
  const [financialSelectedYear, setFinancialSelectedYear] = useState('2024');
  const [enrollmentSelectedYear, setEnrollmentSelectedYear] = useState('2024'); // Default year
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useContext(ThemeContext);


  // Fetch Children Data
  const fetchChildrenData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/children?year=${year}`);
      setChildrenData(response.data);
    } catch (error) {
      console.error("Error fetching children data", error);
    }
  };

  // Fetch caregivers data based on selected year
  const fetchCaregiversData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/caregivers?year=${year}`);
      // console.log("API Response:", response.data); // Log the API response
      setCaregiversData(response.data);
    } catch (error) {
      console.error("Error fetching caregivers data", error);
    }
  };

  // // Fetch Financial Data
  // const fetchFinancialData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/financial-summary')
  //     setFinancialData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching financial data", error);
  //   }
  // };

  // Fetch financial data based on the selected year

  const fetchFinancialData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/financial-summary?year=${year}`);
      setFinancialData(response.data);
    } catch (error) {
      console.error("Error fetching financial data", error);
    }
  }
  // Fetch Attendance Stats
  const fetchAttendanceStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance');
      setAttendanceStats(response.data);
    } catch (error) {
      console.error("Error fetching attendance stats", error);
    }
  };

  ;

  // Function to fetch enrollment data based on year
  const fetchEnrollmentData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/enrollment?year=${year}`);
      setEnrollmentData(response.data);
    } catch (error) {
      console.error("Error fetching enrollment data", error);
    }
  };


  useEffect(() => {
    fetchChildrenData(childrenSelectedYear);
  }, [childrenSelectedYear]);
  // Fetch data when the component mounts
  useEffect(() => {
    fetchCaregiversData(caregiversSelectedYear);
  }, [caregiversSelectedYear]);

  useEffect(() => {
    fetchFinancialData(financialSelectedYear);
  }, [financialSelectedYear]);

  // Fetch data when component mounts or year changes
  // Fetch data when component mounts or year changes
  useEffect(() => {
    fetchEnrollmentData(enrollmentSelectedYear);
  }, [enrollmentSelectedYear]);




  // Fetch data when the component mounts
  useEffect(() => {
    fetchAttendanceStats();
  }, []);


  // Determine the content based on change_percentage
  const { change_percentage, current_week_attendance, last_week_attendance } = predictAttandance;

  // Ensure change_percentage is a valid number
  const validChangePercentage = !isNaN(change_percentage) && typeof change_percentage === 'number'
    ? change_percentage
    : 0; // Default to 0 if NaN

  const isIncrease = validChangePercentage >= 0;
  const displayText = isIncrease
    ? `${validChangePercentage} % more than last week's attendance`
    : `${Math.abs(validChangePercentage)} % less than last week's attendance`;

  // Create dynamic class names
  const bgColorClass = isIncrease ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800';
  const textColorClass = isIncrease ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300';


  // Filter children data based on the selected year
  // const childrenData = childrenData.filter(child => {
  //   const childYear = child.year;
  //   return childYear === parseInt(childrenSelectedYear); // Convert childrenSelectedYear to an integer
  // });

   // Handle the change in year dropdown
   const handleChildrenYearChange = (event) => {
    const year = event.target.value;
    setChildrenSelectedYear(year);
    fetchChildrenData(year);  // Fetch data for the selected year
  };

  // Handle the change in year dropdown
  const handleCaregiverYearChange = (event) => {
    const year = event.target.value;
    setCaregiversSelectedYear(year);
    fetchCaregiversData(year);  // Fetch data for the selected year
  };

  // Handle the change in the financial year dropdown
  const handleFinancialYearChange = (event) => {
    const year = event.target.value;
    setFinancialSelectedYear(year);
    fetchFinancialData(year);
  };

  // Handle year change
  const handleEnrollmentYearChange = (event) => {
    setEnrollmentSelectedYear(event.target.value);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const totalAttendance = attendanceStats.length;
  const onTimeCount = attendanceStats.filter(attendee => attendee.status === 'on-time').length;
  const lateCount = attendanceStats.filter(attendee => attendee.status === 'late attendance').length;
  const dayOffCount = attendanceStats.filter(attendee => attendee.status === 'take day-off').length;
  const notPresentCount = attendanceStats.filter(attendee => attendee.status === 'not-present').length;

  const mostFrequentStatus = [onTimeCount, lateCount, dayOffCount, notPresentCount]
    .sort((a, b) => b - a)[0];

  return (
    <>
      <div className="threecharts flex justify-between flex-wrap gap-10 p-8 md:justify-around dark:bg-gray-900 bg-white">
        {/* Children Overview */}
        <div className="childrenOverview h-full p-4 flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 sm-flex-basis-full full-width-centered bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="heading flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="pl-1">
                <img src="children2.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
              </div>
              <div className="font-semibold dark:text-white">Children Overview</div>
            </div>
            <div className="relative inline-block p-2">
              {/* Dropdown for year selection */}
              <select
                className="block appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={childrenSelectedYear}
                onChange={handleChildrenYearChange}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            {theme === 'dark' ? (
              <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} />
            ) : (
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
            )}
          </div>


          <div className="display-chart flex justify-center items-center p-5 h-64">
            <ChildrenCharts data={childrenData} />
          </div>

          <div className="flex justify-center my-4">
            {theme === 'dark' ? (
              <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} style={{ width: '90%' }} />
            ) : (
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} style={{ width: '90%' }} />
            )}
          </div>

          <div className="stats flex justify-evenly m-4">
            {/* Display dynamic children stats */}
            <div className="registered flex flex-col items-center">
              <div className="w-2 h-2 bg-fuchsia-600 rounded-full mb-2"></div>
              <div className="text-gray-400 dark:text-gray-300 font-semibold">Registered</div>
              <div className="font-bold dark:text-white">{childrenData.filter(child => child.status === 'registered').length}</div>
            </div>
            <div className="active flex flex-col items-center">
              <div className="w-2 h-2 bg-orange-600 rounded-full mb-2"></div>
              <div className="text-gray-400 dark:text-gray-300 font-semibold">Active</div>
              <div className="font-bold dark:text-white">{childrenData.filter(child => child.status === 'active').length}</div>
            </div>
            <div className="inactive flex flex-col items-center">
              <div className="w-2 h-2 bg-pink-600 rounded-full mb-2"></div>
              <div className="text-gray-400 dark:text-gray-300 font-semibold">Inactive</div>
              <div className="font-bold dark:text-white">{childrenData.filter(child => child.status === 'inactive').length}</div>
            </div>
          </div>
        </div>

        {/* Caregivers Overview */}
        <div className="caregiverOverview h-full p-4 flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 full-width-centered bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
          <div className="heading flex justify-between items-center">
            <div className='flex gap-2 items-center'>
              <div className='pl-1'>
                <img src="/caregivers1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
              </div>
              <div className="font-semibold">Caregiver Overview</div>
            </div>
            <div className="relative inline-block p-2">
              <select
                value={caregiversSelectedYear}
                onChange={handleCaregiverYearChange}
                className="block appearance-none w-full bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:focus:bg-gray-700"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            {theme === 'dark' ? (
              <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} />
            ) : (
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
            )}
          </div>


          <div className="display-chart flex justify-center items-center p-5 h-64">
            <CaregiversCharts data={caregiversData} />
          </div>

          <div className="flex justify-center my-4">
            {theme === 'dark' ? (
              <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} style={{ width: '90%' }} />
            ) : (
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} style={{ width: '90%' }} />
            )}
          </div>

          <div className="caregiverstats flex justify-evenly m-4">
            <div className="registered flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-900 rounded-full mb-2"></div>
              <div className="flex items-center gap-2">
                <div className='text-gray-400 dark:text-gray-300 font-semibold'>Registered</div>
              </div>
              <div className="font-bold dark:text-white">{caregiversData.filter(caregiver => caregiver.status === 'registered').length}</div>
            </div>
            <div className="active flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mb-2"></div>
              <div className="flex items-center gap-2">
                <div className='text-gray-400 dark:text-gray-300 font-semibold'>Active</div>
              </div>
              <div className="font-bold dark:text-white">{caregiversData.filter(caregiver => caregiver.status === 'active').length}</div>
            </div>
            <div className="inactive flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-300 rounded-full mb-2"></div>
              <div className="flex items-center gap-2">
                <div className='text-gray-400 dark:text-gray-300 font-semibold'>Inactive</div>
              </div>
              <div className="font-bold dark:text-white">{caregiversData.filter(caregiver => caregiver.status === 'inactive').length}</div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="financialOverview h-full p-4 flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 full-width-centered bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="heading flex justify-between items-center">
            <div className='flex gap-2 items-center'>
              <div className='pl-1'>
                <img src="/financial1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
              </div>
              <div className="font-semibold dark:text-gray-100">Financial Overview</div>
            </div>
            <div className="relative inline-block p-2">
              <select
                className="block appearance-none w-full bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={financialSelectedYear}
                onChange={handleFinancialYearChange}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            {theme === 'dark' ? (
              <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} />
            ) : (
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
            )}
          </div>



          <div className="outcome grid grid-cols-2 gap-4 p-3">
            {/* Total Revenue */}
            <div className="total-revenue p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
              <div className="flex mb-4 ml-1">
                <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="font-bold text-sm dark:text-gray-300">Total Revenue</div>
                </div>
              </div>
              <div className="money font-bold text-black dark:text-white text-xl ml-2">${financialData.totalRevenue}</div>
              <div className="period text-gray-500 dark:text-gray-400 ml-2">Last 30 days</div>
            </div>


            {/* Profit Margin */}
            <div className="profit-margin p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
              <div className="flex mb-4 ml-1">
                <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="font-bold text-sm dark:text-gray-300">Total Profit</div>
                </div>
              </div>
              <div className="money font-bold text-black dark:text-white text-xl ml-2">{financialData.profitMargin}%</div>
              <div className="period text-gray-500 dark:text-gray-400 ml-2">Last 30 days</div>
            </div>

            {/* Total Income */}
            <div className="total-income p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
              <div className="flex mb-4 ml-1">
                <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="font-bold text-sm dark:text-gray-300">Total Income</div>
                </div>
              </div>
              <div className="money font-bold text-black dark:text-white text-xl ml-2">${financialData.netIncome}</div>
              <div className="period text-gray-500 dark:text-gray-400 ml-2">Last 30 days</div>
            </div>

            {/* Total Expenses */}
            <div className="total-expenses p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
              <div className="flex mb-4 ml-1">
                <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <div className="font-bold text-sm dark:text-gray-300">Total Expenses</div>
                </div>
              </div>
              <div className="money font-bold text-black dark:text-white text-xl ml-2">
                ${financialData?.totalExpenses?.toLocaleString() || 0}
              </div>
              <div className="period text-gray-500 dark:text-gray-400 ml-2">Last 30 days</div>
            </div>
          </div>

          <div className="flex items-center bg-blue-50 dark:bg-gray-700 rounded-lg m-3 p-2">
            <div>
              <img src="/info1.gif" alt="" width={24} height={24} className={theme === 'dark' ? 'invert-image' : ''} />
            </div>
            <div className="ml-2 text-cyan-700 dark:text-cyan-300">Check daily to keep it on track</div>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="Attendance w-1/2 max-w-md maxWidth25rem md:flex-basis-1/2 full-width-centered bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="heading flex justify-between items-center mt-2 mb-3">
            <div className='flex gap-2 items-center'>
              <div className='pl-1'>
                <img src="/attendance1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
              </div>
              <div className="font-semibold text-black dark:text-white">Attendance</div>
            </div>


            <div className="font-semibold bg-blue-100 dark:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={handleOpenModal}>
              <div className="text-black dark:text-gray-300">View Stats</div>
            </div>
          </div>
          <div>
            {theme === 'dark' ? (
              <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} />
            ) : (
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
            )}
          </div>
          <div className="display-chart-custom flex justify-center items-center p-5">
            <AttendanceCharts data={attendanceStats} />
          </div>

          <div className="attendance-stats mt-5">
            <div className="flex justify-around mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
                <div className="font-bold text-black dark:text-white">{onTimeCount}</div>
                <div className="text-gray-600 dark:text-gray-400">on time</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                <div className="font-bold text-black dark:text-white">{lateCount}</div>
                <div className="text-gray-600 dark:text-gray-400">late attendance</div>
              </div>
            </div>
            <div className="flex justify-around mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 dark:bg-orange-300 rounded-full"></div>
                <div className="font-bold text-black dark:text-white">{dayOffCount}</div>
                <div className="text-gray-600 dark:text-gray-400">take day off</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full"></div>
                <div className="font-bold text-black dark:text-white">{notPresentCount}</div>
                <div className="text-gray-600 dark:text-gray-400">not present</div>
              </div>
            </div>
            <div className={`${bgColorClass} p-3 rounded-lg flex items-center gap-2 mt-5`}>
              <div className={`${textColorClass} font-bold`}>
                <img src={isIncrease ? "/increase.gif" : "/decrease.gif"} alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
              </div>
              <div className={textColorClass}>
                {displayText}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Modal */}
        <AttendanceModal isOpen={openModal} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Detailed Attendance Stats</h2>
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">Summary:</h3>
            <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
              <li>Total Attendance Records: {totalAttendance}</li>
              <li>Most Frequent Status: {mostFrequentStatus === onTimeCount ? 'On Time' : mostFrequentStatus === lateCount ? 'Late Attendance' : mostFrequentStatus === dayOffCount ? 'Take Day Off' : 'Not Present'}</li>
            </ul>
          </div>
        </AttendanceModal>

        {/* Enrollment Overview */}
        <div className="EnrollmentOverview w-[62%] p-4 md:flex-basis-full full-width-centered bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="heading flex justify-between items-center mb-2">
            <div className='flex gap-2 items-center'>
              <div className='pl-1'>
                <img src="/enrollment1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
              </div>
              <div className="font-semibold text-black dark:text-white">Enrollments Record</div>
            </div>

            <div className="relative inline-block p-2">
              <select
                className="block appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-gray-500 dark:focus:border-gray-500"
                value={enrollmentSelectedYear}
                onChange={handleEnrollmentYearChange}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            {theme === 'dark' ? (
              <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} />
            ) : (
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
            )}
          </div>

          <div className='h-full'>
            <EnrollmentCharts data={enrollmentData} />
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
