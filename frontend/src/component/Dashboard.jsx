import React, { useState, useEffect, useContext } from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import '../App.css';
import AttendanceCharts from './AttendanceCharts';
import CaregiversCharts from './CaregiversCharts';
import ChildrenCharts from './ChildrenCharts';
import EnrollmentCharts from './EnrollmentCharts';
import { DarkModeContext } from '../context/DarkModeContext';

const Dashboard = () => {
  // State variables for dynamic data
  const [childrenData, setChildrenData] = useState([]);
  const [caregiversData, setCaregiversData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([])
  const [financialData, setFinancialData] = useState({});
  const [predictAttandance, setPredictAttandance] = useState([])
  const [EnrollmentSummary, setEnrollmentSummary] = useState({})

  // Use dark mode context
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  // Fetch Children Data
  const fetchChildrenData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/children');  
      setChildrenData(response.data);
    } catch (error) {
      console.error("Error fetching children data", error);
    }
  };

  // Fetch Caregivers Data
  const fetchCaregiversData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/caregivers');
      setCaregiversData(response.data);
    } catch (error) {
      console.error("Error fetching caregivers data", error);
    }
  };

  // Fetch Attendance Stats
  const fetchAttendanceStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance');
      setAttendanceStats(response.data);
    } catch (error) {
      console.error("Error fetching attendance stats", error);
    }
  };

  // Fetch Financial Data
  const fetchFinancialData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/financial-summary')
      setFinancialData(response.data);
    } catch (error) {
      console.error("Error fetching financial data", error);
    }
  };

  // Fetch Enrollment Data
  const fetchEnrollmentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/enrollment');
      setEnrollmentData(response.data);
    } catch (error) {
      console.error("Error fetching financial data", error);
    }
  };

  const fetchAttandancePrediction = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/predict-attendance');
      setPredictAttandance(response.data);
    } catch (error) {
      console.error("Error fetching attandance prediction data", error);
    }
  };

  const fetchEnrollmentSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/enrollments-summary');
      setEnrollmentSummary(response.data);
    } catch (error) {
      console.error("Error fetching enrollments summary data", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchChildrenData();
    fetchCaregiversData();
    fetchAttendanceStats();
    fetchFinancialData();
    fetchEnrollmentData();
    fetchAttandancePrediction();
    fetchEnrollmentSummary();
  }, []);

  // Handle dark mode based on local storage
  useEffect(() => {
    const localDarkMode = localStorage.getItem('darkMode');
    if (localDarkMode) {
      const darkModeEnabled = localDarkMode === 'true';
      setIsDarkMode(darkModeEnabled); // Update context state
      document.documentElement.classList.toggle('dark', darkModeEnabled); // Apply dark mode styles
    }
  }, [setIsDarkMode]); // Include setIsDarkMode in the dependency array
  
  // Determine the content based on change_percentage
  const { change_percentage, current_week_attendance, last_week_attendance } = predictAttandance;
  const isIncrease = typeof change_percentage === 'number' && change_percentage >= 0;
  const displayText = isIncrease
    ? `${change_percentage} % more than last week's attendance`
    : `${Math.abs(change_percentage)} % less than last week's attendance`;

  // Create dynamic class names
  const bgColorClass = isIncrease ? 'bg-green-200' : 'bg-red-200';
  const textColorClass = isIncrease ? 'text-green-700' : 'text-red-700';

    return (
      <>
        <div className="threecharts flex justify-between flex-wrap gap-10 p-8 md:justify-around">
          {/* Children Overview */}
          <div className="childrenOverview h-full flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 sm-flex-basis-full full-width-centered bg-white rounded-lg shadow-md">
            <div className="heading flex justify-between items-center">
              <div className='flex gap-2 items-center'>
                <div className='pl-1'><img src="children.gif" alt="" width={30} height={30} /></div>
                <div className="font-semibold">Children Overview</div>
              </div>
              <div className="relative inline-block p-2">
                {/* Dropdown for year selection */}
                <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>

            <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />

            <div className="display-chart flex justify-center items-center p-5 h-64">
              <ChildrenCharts data={childrenData} />
            </div>

            <div className="flex justify-center my-4">
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} style={{ width: '90%' }} />
            </div>

            <div className="stats flex justify-evenly m-4">
              {/* Display dynamic children stats */}
              <div className="registered flex flex-col items-center">
                <div className="w-2 h-2 bg-cyan-950 rounded-full mb-2"></div>
                <div className='text-gray-400 font-semibold'>Registered</div>
                <div className="font-bold">{childrenData.filter(child => child.status === 'registered').length}</div>
              </div>
              <div className="active flex flex-col items-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full mb-2"></div>
                <div className='text-gray-400 font-semibold'>Active</div>
                <div className="font-bold">{childrenData.filter(child => child.status === 'active').length}</div>
              </div>
              <div className="inactive flex flex-col items-center">
                <div className="w-2 h-2 bg-pink-600 rounded-full mb-2"></div>
                <div className='text-gray-400 font-semibold'>Inactive</div>
                <div className="font-bold">{childrenData.filter(child => child.status === 'inactive').length}</div>
              </div>
            </div>
          </div>

          {/* Caregivers Overview */}
          <div className="caregiverOverview h-full flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 full-width-centered bg-white rounded-lg shadow-md">
            <div className="heading flex justify-between items-center">
              <div className='flex gap-2 items-center'>
                <div className='pl-1'><img src="/caregivers.gif" alt="" width={30} height={30} /></div>
                <div className="font-semibold">Caregiver Overview</div>
              </div>
              <div className="relative inline-block p-2">
                <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>

            </div>

            <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />

            <div className="display-chart flex justify-center items-center p-5 h-64">
              <CaregiversCharts data={caregiversData} />
            </div>

            <div className="flex justify-center my-4">
              <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} style={{ width: '90%' }} />
            </div>

            <div className="caregiverstats flex justify-evenly m-4">
              <div className="registered flex flex-col items-center">
                <div className="w-2 h-2 bg-blue-900 rounded-full mb-2"></div>
                <div className="flex items-center gap-2">
                  <div className='text-gray-400 font-semibold'>Registered</div>
                </div>
                <div className="font-bold">{caregiversData.filter(caregiver => caregiver.status === 'registered').length}</div>
              </div>
              <div className="active flex flex-col items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mb-2"></div>
                <div className="flex items-center gap-2">
                  <div className='text-gray-400 font-semibold'>Active</div>
                </div>
                <div className="font-bold">{caregiversData.filter(caregiver => caregiver.status === 'active').length}</div>
              </div>
              <div className="inactive flex flex-col items-center">
                <div className="w-2 h-2 bg-blue-300 rounded-full mb-2"></div>
                <div className="flex items-center gap-2">
                  <div className='text-gray-400 font-semibold'>Inactive</div>
                </div>
                <div className="font-bold">{caregiversData.filter(caregiver => caregiver.status === 'inactive').length}</div>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="financialOverview h-full flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 full-width-centered bg-white rounded-lg shadow-md">
            <div className="heading flex justify-between items-center">
              <div className='flex gap-2 items-center'>
                <div className='pl-1'><img src="/financial.gif" alt="" width={30} height={30} /></div>
                <div className="font-semibold">Financial Overview</div>
              </div>
              <div className="relative inline-block p-2">
                <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>

            <Divider sx={{ backgroundColor: 'black', opacity: 0.1, margin: 'auto' }} />

            <div className="outcome grid grid-cols-2 gap-4 p-3">
              {/* Total Revenue */}
              <div className="total-revenue p-3 rounded-lg shadow-xl bg-yellow-50">
                <div className="flex mb-4 ml-1">
                  <div className="bg-blue-50 rounded-lg flex items-center gap-2 p-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="font-bold text-sm">Total Revenue</div>
                  </div>
                </div>
                <div className="money font-bold text-black text-xl ml-2">${financialData.totalRevenue}</div>
                <div className="period text-gray-500 ml-2">Last 30 days</div>

              </div>


              {/* Profit Margin */}
              <div className="profit-margin p-3 rounded-lg shadow-xl bg-yellow-50">
                <div className="flex mb-4 ml-1">
                  <div className="bg-blue-50 rounded-lg flex items-center gap-2 p-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="font-bold text-sm">Total Profit</div>
                  </div></div>
                <div className="money font-bold text-black text-xl ml-2">{financialData.profitMargin}%</div>
                <div className="period text-gray-500 ml-2">Last 30 days</div>

              </div>

              {/* Total Income */}
              <div className="total-income p-3 rounded-lg shadow-xl bg-yellow-50">
                <div className="flex mb-4 ml-1">
                  <div className="bg-blue-50 rounded-lg flex items-center gap-2 p-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="font-bold text-sm">Total Income</div>
                  </div> </div>
                <div className="money font-bold text-black text-xl ml-2">${financialData.netIncome}</div>
                <div className="period text-gray-500 ml-2">Last 30 days</div>

              </div>

              {/* Total Expenses */}
              <div className="total-expenses p-3 rounded-lg shadow-xl bg-yellow-50">
                <div className="flex mb-4 ml-1">
                  <div className="bg-blue-50 rounded-lg flex items-center gap-2 p-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <div className="font-bold text-sm">Total Expenses</div>
                  </div></div>
                <div className="money font-bold text-black text-xl ml-2">
                  ${financialData?.totalExpenses?.toLocaleString() || 0}
                </div>
                <div className="period text-gray-500 ml-2">Last 30 days</div>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 rounded-lg m-3 p-2 ">
              <div><img src="/info.gif" alt="" width={24} height={24} /></div>
              <div className='ml-2 text-cyan-700'>Check daily to keep it on track</div>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="Attendeance w-1/2 max-w-md maxWidth25rem md:flex-basis-1/2 full-width-centered bg-white p-4 rounded-lg shadow-md ml-1440 ml-1280 ml-1024 ml-768">
            <div className="heading flex justify-between items-center mb-2">
              <div className='flex gap-2 items-center'>
                <div className='pl-1'><img src="/attendance.gif" alt="" width={30} height={30} /></div>
                <div className="font-semibold">Attendeance</div>
              </div>
              <div className="font-bold bg-blue-100 rounded-lg p-2">
                <div>View Stats</div>

              </div>

            </div>
            <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />

            <div className="display-chart display-chart-custom flex justify-center items-center p-5">
              <AttendanceCharts data={attendanceStats} />
            </div>

            <div className="attendance-stats mt-5">
              {/* First Row: On Time and Late Attendance */}
              <div className="flex justify-around mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <div className="font-bold text-black">{attendanceStats.filter(attendee => attendee.status === 'on-time').length}</div>
                  <div className="text-gray-600">on time</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <div className="font-bold text-black">{attendanceStats.filter(attendee => attendee.status === 'late attendance').length}</div>
                  <div className="text-gray-600">late attendance</div>
                </div>
              </div>

              {/* Second Row: Take Day Off and Not Present */}
              <div className="flex justify-around mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="font-bold text-black">{attendanceStats.filter(attendee => attendee.status === 'take day-off').length}</div>
                  <div className="text-gray-600">take day off</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="font-bold text-black">{attendanceStats.filter(attendee => attendee.status === 'not-present').length}</div>
                  <div className="text-gray-600">not present</div>
                </div>
              </div>

              <div className={`${bgColorClass} p-3 rounded-lg flex items-center gap-2 mt-5`}>
                <div className={`${textColorClass} font-bold`}>
                  <img src={isIncrease ? "/increase.gif" : "/decrease.gif"} alt="" width={30} height={30} />
                </div>
                <div className={textColorClass}>
                  {displayText}
                </div>
              </div>

            </div>
          </div>

          {/* Enrollment Overview */}
          <div className="EnrollmentOverview w-[60%] md:flex-basis-full full-width-centered bg-white rounded-lg shadow-md">
            <div className="heading flex justify-between items-center mb-2">
              <div className='flex gap-2 items-center pl-4 pt-4'>
                <div className='pl-1'><img src="/enrollment.gif" alt="" width={30} height={30} /></div>
                <div className="font-semibold">Enrollments Record</div>
              </div>

              <div className="relative inline-block p-2">
                <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>

            <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
            <div className='h-full'>
              <EnrollmentCharts data={enrollmentData} />
            </div>


          </div>
        </div>






      </>
    );
  };

  export default Dashboard;
