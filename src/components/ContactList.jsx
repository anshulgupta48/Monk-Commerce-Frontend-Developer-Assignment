import { useState, useEffect, useRef } from 'react';
import { ThreeDotsVerticalIcon } from '../assets/export';
import styles from '../assets/styles/contactList.module.scss';

const ContactList = ({ userDetails, setUserDetails, activeUserDetails, setActiveUserDetails }) => {
    const [activeMoreOptionsModal, setActiveMoreOptionsModal] = useState(-1);
    const [readMessagesContact, setReadMessagesContact] = useState([]);
    const moreOptionsModalRef = useRef(null);

    useEffect(() => {
        let handler = (e) => {
            if (moreOptionsModalRef.current && !moreOptionsModalRef.current.contains(e.target)) {
                setActiveMoreOptionsModal(-1);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, []);

    const handleContactClick = (item, index) => {
        const updatedReadMessagesContact = [...readMessagesContact, item.userId];
        setReadMessagesContact(updatedReadMessagesContact);
        setActiveUserDetails(index);
    }

    const handleMarkAsUnread = (item) => {
        if (readMessagesContact.includes(item.userId)) {
            const updatedReadMessagesContact = readMessagesContact.filter((subItem) => subItem != item.userId);
            setReadMessagesContact(updatedReadMessagesContact);
            setActiveMoreOptionsModal(-1);
        }
    }

    const handleDeleteContact = (itemIndex) => {
        const updatedUserDetails = userDetails.filter((item, index) => index !== itemIndex);
        setUserDetails(updatedUserDetails);
        setActiveMoreOptionsModal(-1);
    }

    return (
        <div className={styles["contactList_container"]}>
            <h1 className={styles["contactList_container_title"]}>Chats</h1>

            <div className={styles["contactList_container_main"]}>
                {userDetails.map((item, index) => (
                    <div className={activeUserDetails == index ? `${styles.contactList_container_main_box} ${styles.active}` : `${styles.contactList_container_main_box}`} key={index}>
                        <div className={styles["contactList_container_main_box_left"]} onClick={() => handleContactClick(item, index)}>
                            <img src={item.profilePictureURL} alt="Profile-Icon" className={styles["contactList_container_main_box_left_icon"]} />
                            <div className={styles["contactList_container_main_box_left_profile"]}>
                                <h4 className={styles["contactList_container_main_box_left_profile_name"]}>{item.name}</h4>
                                <p className={styles["contactList_container_main_box_left_profile_chat"]}>{item.chat[item.chat.length - 1].you.message}</p>
                                {(item.unreadCount > 0 && !readMessagesContact.includes(item.userId)) && <span className={styles["contactList_container_main_box_left_profile_chat_unread"]}>{item.unreadCount}</span>}
                            </div>
                        </div>

                        <img src={ThreeDotsVerticalIcon} alt="Three-Dots-Icon" className={styles["contactList_container_main_box_right"]} onClick={() => setActiveMoreOptionsModal(index)} />

                        {activeMoreOptionsModal === index && <div className={styles["contactList_container_modal"]} ref={moreOptionsModalRef}>
                            <p className={styles["contactList_container_modal_text"]} onClick={() => handleMarkAsUnread(item)}>Mark as Unread</p>
                            <p className={styles["contactList_container_modal_text"]} onClick={() => handleDeleteContact(index)}>Delete</p>
                            <p className={styles["contactList_container_modal_text"]} onClick={() => setActiveMoreOptionsModal(false)}>Cancel</p>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContactList;