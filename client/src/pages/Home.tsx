import Chatbot from '../components/Chatbot/Chatbot';
import './Home.css';

const Home = () => {
    return (
        <div className="home container-fluid m-0 p-0 h-100">
            <div className='row'></div>
            <div className='row'>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'>
                    <Chatbot></Chatbot>
                </div>
            </div>
        </div>
    );
};

export default Home;