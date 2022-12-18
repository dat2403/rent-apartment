import React, {useMemo} from "react";
import UserModel from "../../../../model/UserModel";
import styles from "./UserCard.module.css";
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import AppText from "../../../../components/AppText/AppText";

interface UserCardProps {
    item: UserModel
}

const UserCard: React.FC<UserCardProps> = (props) => {
    const {item} = props

    const userRoleTagColor = useMemo(() => {
        switch (item?.role) {
            case "ADMIN": {
                return "red"
            }
            case "SELLER": {
                return "orange"
            }
            default: {
                return "darkgray"
            }
        }
    }, [item?.role])

    const userRoleTagText = useMemo(() => {
        switch (item?.role) {
            case "SELLER": {
                return "Householder"
            }
            case "ADMIN": {
                return "Admin"
            }
            default: {
                return "User"
            }
        }
    }, [item?.role])

    return (
        <div
            {...props}
            className={styles.cardContainer}>
            <Avatar sx={{
                bgcolor: deepPurple[500],
                height: "50px",
                width: "50px"
            }}>{item?.name?.slice(0, 2).toUpperCase()}</Avatar>
            <div className={styles.cardContent}>
                <div className={styles.tagContainer}>
                    <AppText font={"semi"} className={styles.cardTitle}>{item?.name}</AppText>
                    <div style={{
                        background: userRoleTagColor,
                        padding: "4px 12px",
                        borderRadius: "8px",
                        marginLeft: "30px"
                    }}>
                        <AppText className={styles.roleTagName}>{userRoleTagText}</AppText>
                    </div>
                </div>
                <AppText className={styles.email}>{item?.email}</AppText>
                <AppText className={styles.email}>{item?.phone}</AppText>
                <AppText className={styles.email}>{item?.address}</AppText>
            </div>
        </div>
    )
}


export default UserCard;
