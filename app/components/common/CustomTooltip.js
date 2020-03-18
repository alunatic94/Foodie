/* Component obtained and modified from https://github.com/tingzhouu/rn-rne-tooltip */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Tooltip as RNETooltip } from 'react-native-elements';

const TOOLTIP_WIDTH = 200;
const TOOLTIP_PADDING = 15;

// function getPopover(tooltipText) {
//   return (
//     <Text>
//       {tooltipText}
//     </Text>
//   );
// }

class CustomTooltip extends Component {
  state = { tooltipHeight: 0 };

  renderHiddenBoxToGetHeight = () => {
    const { tooltipText } = this.props;

    return (
      <View
        style={[
          { width: TOOLTIP_WIDTH, padding: TOOLTIP_PADDING },
          styles.tooltipHiddenBox,
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          this.setState({
            tooltipHeight: height,
          });
        }}
      >
          {this.props.children}
        {/* <Text style={styles.tooltipHiddenText}>
          {tooltipText}
        </Text> */}
      </View>
    );
  }

  render() {
    const {
      popover, withOverlay, backgroundColor, style
    } = this.props;

    const {
      tooltipHeight,
    } = this.state;

    return (
      <RNETooltip
        width={TOOLTIP_WIDTH}
        height={tooltipHeight}
        withOverlay={withOverlay}
        popover={popover}
        backgroundColor={backgroundColor}
        style={styles}
      >
        <View>
          {this.props.children}
        {this.renderHiddenBoxToGetHeight()}
        </View>
      </RNETooltip>
    );
  }
}

const styles = StyleSheet.create({
  tooltipHiddenBox: {
    position: 'absolute',
    right: 10000000000,
  },
  tooltipHiddenText: {
    color: 'transparent',
  },
});

export default CustomTooltip;