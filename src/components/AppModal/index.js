/**
 * This is Reusable Component For Modal
 */

import React,{Component} from 'react';
import { View, Modal, Dimensions ,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


const WIDTH = Dimensions.get('window').width;

class AppModal extends Component {
  render(){
    const {children,visible, style, outStyle ,animationType} = this.props;
    return (
      <Modal
        visible={visible}
        transparent
        animationType={animationType}
        onRequestClose={() => {}}
      >
        <View style={[styles.containerStyle, outStyle]}>
          <View style={[styles.modalStyle, style]}>
              {children}
          </View>
        </View>
      </Modal>
    );

  }
}



AppModal.propTypes = {
  children: PropTypes.node.isRequired,
  visible : PropTypes.bool.isRequired,
  animationType : PropTypes.string
}

AppModal.defaultProps = {
  animationType : 'fade',
  visible:false
}


export  {AppModal} ;

const styles = StyleSheet.create({
  containerStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.6)',
  },
  modalStyle:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    width : WIDTH * 0.8,
    padding:15,
    borderWidth:1,
    borderColor:'#fff',
    elevation:1,
    shadowColor:'#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.2,
    shadowRadius:2,
  },
});