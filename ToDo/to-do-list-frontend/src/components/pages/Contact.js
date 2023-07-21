import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome';
import './Contact.css';

export const Contact = () =>{
    return(
        <div>
            <div class="contact-section">
                <h1>Contact Us</h1>
                    <p>
                        If you wish to contact any of our employees you can do with their personal emails<br></br>
                        which can be found on our About page or call us at: + 01 234 567 88<br></br>
                        or you could visit our office at: 8 "Kliment Ohridski" Blvd, Sofia<br></br>
                    </p>
                    <p><FontAwesomeIcon icon={faHome} className="mr-3" />ToDo@tu-sofia.bg</p>
                    <p>
                        Github repo {" "}
                        <a href="https://github.com/kristiyanstoykov/MusalaSoft-Project">here</a>
                    </p>
            </div>
        </div>

    )

}
export default Contact;
