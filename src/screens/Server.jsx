import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ServerList from '../components/ServerList';
import { getServer } from '../functions/ServerStorage';
import style from '../style/ServerStyle';

const Server = ( { navigation } ) => {
    const [ serverList, setServerList ] = useState([]);

    const fetchData = async () => {
        try {
            const servers = await getServer();
            if (servers) {
                setServerList(JSON.parse(servers));
            }
        } catch (e) {
            console.error(e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const refreshServerList = () => {
        fetchData();
    };

    let isServerListEmpty = serverList.length === 0;

    return (
        <View style={ [style.mainContainer] }>
            <ScrollView>
                <View>
                    <ServerList
                        data={ serverList }
                        isEmpty={ isServerListEmpty }
                        navigation={ navigation }
                        refreshServerList={ refreshServerList }
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default Server;
