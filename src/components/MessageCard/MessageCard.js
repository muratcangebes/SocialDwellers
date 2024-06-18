import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { formatDistance, parseISO } from "date-fns";
import { es, tr, ru } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const deviceSize = Dimensions.get('window');

const MessageCard = ({ message, onLike, onDislike }) => {
    
    const formattedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true, locale: tr });

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.user}>{message.username}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.content}>{message.text}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={onLike}>
                    <Icon name="thumb-up" style={styles.iconLike} />
                    {!!message.like && (
                        <Text style={styles.iconText}>{message.like}</Text>
                    )}
                </TouchableOpacity>
                

            </View>
        </View>
    );
};

/*
                <TouchableOpacity style={styles.iconButton} onPress={onDislike}>
                    <Icon name="thumb-down" style={styles.iconDislike} />
                    {!!message.dislike && (
                        <Text style={styles.iconText}>{message.dislike}</Text>
                    )}
                </TouchableOpacity>
*/

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        width: deviceSize.width - 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    user: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        color: 'white',
        fontStyle: 'italic',
    },
    contentContainer: {
        backgroundColor: '#3399FF',
        borderRadius: 10,
        padding: 10,
    },
    content: {
        color: 'white',
        fontSize: 15,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    iconLike: {
        color: '#050C9C', // yeşil renk
        fontSize: 24,
    },
    iconDislike: {
        color: '#F44336', // kırmızı renk
        fontSize: 24,
    },
    iconText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default MessageCard;
