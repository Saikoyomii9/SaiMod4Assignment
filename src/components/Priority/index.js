import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Priority = props => {
        const post = props.post; //added
      
        const onPress = () => { //added function
          console.log(post.name);
        }

        return (
                <View style={styles.container}>
                <TouchableOpacity style={styles.touchable} onPress={onPress}> 
                   <View style={{flex:1}}>
                     <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
                   </View>
                   <View style={{flex:1}}>
                     <Text style={styles.description}>{post.description}</Text>
                   </View>
                 </TouchableOpacity>
             </View>
            );
            };
            
export default Priority;