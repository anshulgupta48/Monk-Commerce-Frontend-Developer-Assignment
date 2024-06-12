import { v4 as uuidv4 } from 'uuid';
import { ConversationTopFeaturesIcons, ConversationBottomFeaturesIcons, SendIcon, ChevronLeftIcon } from '../assets/export';
import styles from '../assets/styles/conversation.module.scss';

const Conversation = ({ userDetails, activeUserDetails, setActiveUserDetails }) => {
    return (
        activeUserDetails >= 0 && <div className={styles["conversation_container"]}>
            <div className={styles["conversation_container_top"]}>
                <div className={styles["conversation_container_top_left"]}>
                    <img src={ChevronLeftIcon} alt="Chevron-Left-Icon" className={styles["conversation_container_top_left_chevron_icon"]} onClick={() => setActiveUserDetails(-1)} />
                    <img src={userDetails[activeUserDetails].profilePictureURL} alt="Profile-Icon" className={styles["conversation_container_top_left_icon"]} />

                    <div className={styles["conversation_container_top_left_profile"]}>
                        <h4 className={styles["conversation_container_top_left_profile_name"]}>{userDetails[activeUserDetails].name}</h4>
                        <p className={styles["conversation_container_top_left_profile_description"]}>Click here for contact info</p>
                    </div>
                </div>

                <img src={ConversationTopFeaturesIcons} alt="Conversation-Top-Features" className={styles["conversation_container_top_right"]} />
            </div>

            <div className={styles["conversation_container_middle"]}>
                {userDetails[activeUserDetails].chat.map((item) => (
                    <>
                        <div className={styles["conversation_container_middle_user_wrapper"]} key={item.user.message} key={uuidv4()}>
                            <div className={styles["conversation_container_middle_user_message"]}>
                                <p className={styles["conversation_container_middle_user_text"]}>{item.user.message}</p>
                                <p className={styles["conversation_container_middle_user_timestamp"]}>{item.user.timeStamp}</p>
                            </div>
                        </div>

                        <div className={styles["conversation_container_middle_other_wrapper"]} key={uuidv4()}>
                            <div className={styles["conversation_container_middle_other_message"]}>
                                <p className={styles["conversation_container_middle_user_text"]}>{item.you.message}</p>
                                <p className={styles["conversation_container_middle_user_timestamp"]}>{item.you.timeStamp}</p>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            <div className={styles["conversation_container_bottom"]}>
                <img src={ConversationBottomFeaturesIcons} alt="Conversation-Bottom-Features" className={styles["conversation_container_bottom_left"]} />

                <div className={styles["conversation_container_bottom_right"]}>
                    <input type="text" placeholder={`Message ${userDetails[activeUserDetails].name}`} className={styles["conversation_container_bottom_right_input"]} />
                    <img src={SendIcon} alt="Send-Icon" className={styles["conversation_container_bottom_right_icon"]} />
                </div>
            </div>
        </div>
    )
}

export default Conversation;