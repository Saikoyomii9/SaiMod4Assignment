import React, { useState, useEffect } from 'react';
import  {View, TouchableOpacity, Text, FlatList} from 'react-native';
import Priority from '../../components/Priority';
import { useNavigation } from '@react-navigation/native'
import styles from './styles';
import { openDatabase } from "react-native-sqlite-storage"

const myRemindersDB = openDatabase({name: 'myReminders.db'});
const prioritiesTableName = 'Priorities';

const PrioritiesScreen = props => {

  const navigation = useNavigation();

  const [priorities, setPriorities] = useState([]);

  useEffect(() => {//use effect only wen screen is in focus
    const listener = navigation.addListener('focus', () => {
      
      // declare an empty arry that will store the results of the 
      //SELECT
      let results = [];
      // declare a transaction that will execute the SELECT
      myRemindersDB.transaction(txn => {
        
        //execute SELECT
        txn.executeSql(
          `SELECT * FROM  ${prioritiesTableName}`,
          [],
          // cal back function that will handle the results form the SELECT
          (_, res) => {
            
            // get number of rows of data selected 
            let len = res.rows.length;
            console.log('Length of Items ' + len);
            // check if more than one ro was returned
            if (len > 0) {
              // loop through the rows 
              for (let i = 0; i < len; i++) {
                // push a row of data at a time
                let item  = res.rows.item(i);
                results.push({
                  id: item.id,
                  title: item.title,
                  description: item.description,
                });
                }
                //assign the results array to the lists table
                setPriorities(results);
              
            } else {
              //if no rows are returned set the lists state variable to an empty array
              setPriorities([]);
            }
          },
          error => {
            console.log('Error getting Items  ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
       <View>
     <FlatList
          data={priorities}
          renderItem={({item}) => <Priority post={item} />} 
          keyExtractor={item=> item.id}
          />
          </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Priority')}
                >
                <Text style={styles.buttonText}>Add Priority</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default PrioritiesScreen;