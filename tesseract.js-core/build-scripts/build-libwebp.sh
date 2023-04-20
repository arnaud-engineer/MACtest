#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/libwebp
CXXFLAGS="-I$INCLUDE_DIR $OPTIM_FLAGS"
LDFLAGS="-L$LIB_DIR"
CM_FLAGS=(
  -DCMAKE_INSTALL_PREFIX=$BUILD_DIR
  -DCMAKE_TOOLCHAIN_FILE=$TOOLCHAIN_FILE
  -DBUILD_SHARED_LIBS=OFF
  -DZLIB_LIBRARY=$LIB_DIR
  -DZLIB_INCLUDE_DIR=$INCLUDE_DIR
  -DPNG_LIBRARY=$LIB_DIR
  -DPNG_PNG_INCLUDE_DIR=$INCLUDE_DIR
  -DJPEG_LIBRARY=$LIB_DIR
  -DJPEG_INCLUDE_DIR=$INCLUDE_DIR
  -DTIFF_LIBRARY=$LIB_DIR
  -DTIFF_INCLUDE_DIR=$INCLUDE_DIR
  -DGIF_LIBRARY=$LIB_DIR
  -DGIF_INCLUDE_DIR=$INCLUDE_DIR
  -DWEBP_ENABLE_SIMD=OFF
  -DWEBP_BUILD_CWEBP=OFF
  -DWEBP_BUILD_DWEBP=OFF
  -DWEBP_BUILD_GIF2WEBP=OFF
  -DWEBP_BUILD_IMG2WEBP=OFF
  -DWEBP_BUILD_VWEBP=OFF
  -DWEBP_BUILD_WEBPINFO=OFF
  -DWEBP_BUILD_WEBPMUX=OFF
  -DWEBP_USE_THREAD=OFF
  -DWEBP_BUILD_ANIM_UTILS=OFF
  -DWEBP_BUILD_EXTRAS=OFF
)
echo "CM_FLAGS=${CM_FLAGS[@]}"

cd $LIB_PATH
if [ $BUILD_CLEAN = 1 ]
then
  rm -rf build
fi
mkdir -p build
cd build
emmake cmake .. -DCMAKE_C_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
if [ $BUILD_CLEAN = 1 ]
then
  emmake make clean
fi
emmake make install -j$PROC
cd $ROOT_DIR
