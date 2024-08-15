import Chatbot from '../components/Chatbot/Chatbot';
import './Home.css';

const Home = () => {
    return (
        <div className="home container-fluid m-0 p-0 h-100 w-100">
            <div className='row h-50 w-100 m-0'></div>
            <div className='row h-50 w-100 m-0'>
                <div className='col-sm-5 p-0 m-0'></div>
                <div className='col-sm-4 p-0 m-0'></div>
                <div className='col-sm-3 p-0 m-0'>
                    <Chatbot></Chatbot>
                </div>
            </div>
        </div>
    );
};

export default Home;