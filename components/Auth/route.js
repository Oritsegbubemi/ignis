import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import AddEvent from "../addevent"
import Events from "../events"
import Formal from "../formal"
import Informal from "../informal"
import Semiformal from "../semiformal"
import Modaload from "../modaload"

export default class Routes extends Component {
    render() {
        return (
            <Router sceneStyle={{backgroundColor: 'transparent'}} >
                <Stack key="root" hideNavBar={false} initial={true}>
                    <Scene renderLeftButton={() => null} backTitle=" " key="Modaload" component={Modaload} title=""/>
                    <Scene renderLeftButton={() => null} backTitle=" " key="AddEvent" component={AddEvent} title="Select a category"/>
                    <Scene renderLeftButton={() => null} backTitle=" " key="Events" component={Events} title="Events"/>
                    <Scene key="Formal" component={Formal} title="Formal"/>
                    <Scene key="Informal" component={Informal} title="Informal"/>
                    <Scene key="Semiformal" component={Semiformal} title="Semiformal"/>
                    
                </Stack>
            </Router>
        );
    }
}