import { FcTodoList } from "react-icons/fc";
import { FaReadme } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoMdHelpCircle } from "react-icons/io";


type DashboardItem = {
  id: number;
  name: string;
  path: string;
  icon: React.ComponentType ;
};

export const DashElm: DashboardItem[] = [
    {
      id: 1,
      name: 'TodoList',
      path: '/AfterSignUp/TodoList',
      icon: FcTodoList
    },
    {
      id: 2,
      name: 'Past Questions',
      path: '/PastQuestions',
      icon: FaReadme
    },
    {
      id: 3,
      name: 'News',
      path: '/News',
      icon: FaNewspaper 
    },
    {
      id: 4,
      name: 'CGPA Calculator',
      path: '/GPACalc',
      icon: MdCalculate 
    }
  ];
  
  export const DashDownElem: DashboardItem[] = [
    {
      id: 1,
      name: 'settings',
      path: '/AfterSignUp/Settings',
      icon: CiSettings
    },
    {
      id: 2,
      name: 'Help & Support',
      path: 'Help',
      icon: IoMdHelpCircle 
    }
  ];
  