#!/bin/bash

# Calibration from xinput_calibrator
x1=102
x2=3908
y1=340
y2=3974
# xinput id for touch screeen (use `xinput list` to find)
torotate=( 12 )

xrandrout="$(xrandr)"

case $xrandrout in
  *768x1280*0\ right* )
    cal=( $x1 $x2 $y1 $y2 )
    rotate=2
    swap=0
    invert=( 1 1 )
    ;;
  *1280x768*0\ inverted* )
    cal=( $y1 $y2 $x1 $x2 )
    rotate=1
    swap=1
    invert=( 1 0 )
    ;;
  *768x1280* )
    cal=( $x1 $x2 $y1 $y2 )
    rotate=0
    swap=0
    invert=( 0 0 )
    ;;
  *1280x768* )
    cal=( $y1 $y2 $x1 $x2 )
    rotate=3
    swap=1
    invert=( 0 1 )
    ;;
esac

xrandr -o $(( rotate ))
for input in ${torotate[@]}; do
  xinput set-prop $input "Evdev Axes Swap" $swap
  xinput set-prop $input "Evdev Axis Inversion" ${invert[@]}
  xinput set-prop $input "Evdev Axis Calibration" ${cal[@]}
done
