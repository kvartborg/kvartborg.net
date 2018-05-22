---
title: Compile CEC for the Raspberry Pi
published: true
description: Control a monitor with CEC on the Raspberry pi, both compilation and basic usage of the libcec library is described in this post.
tags: RPI, Raspberry pi, CEC, Compile, IoT, Install
cover_image:
cover_color: url('/static/imgs/raspberries.jpg') 100% / cover
cover_text_color: white
---

> The steps described in this post was tested and used on a Raspberry pi 3 running a debain wheezy distribution.

This post will include how to compile and use CEC, be aware that CEC only works with displays which supports the technology. The library we will be compiling in this post is the `libcec` from [Pulse Eight](https://github.com/Pulse-Eight).


### Dependencies
Before we can begin we need to ensure that all the dependencies required for libcec to compile and run are installed on the Raspberry pi.
```sh
sudo apt-get update && sudo apt-get install \
  build-essential \
  autoconf \
  liblockdev1-dev \
  libudev-dev \
  git \
  libtool \
  pkg-config \
  cec-client \
  dh-autoreconf \
  cec-utils
```

### Download libcec
The next step will be to download the source files from the libcec repository on GitHub.
```sh
sudo git clone https://github.com/Pulse-Eight/libcec
cd libcec
```

The only version which support the Raspberry pi at the time of this writing is the `2.2.0` version of libcec. To get the correct version before we begin to compile the source, we have to checkout the source code from the git tag named `libcec-2.2.0`.
```sh
git checkout tags/libcec-2.2.0
```

### Compile source
We are now ready to compile the source code. Its important to notice the arguments we are passing to the `configure` command. Those arguments sets our compilation target to the Raspberry pi. Be aware that this step can take few minutes, so go grab a cup of coffee while its running.
```sh
sudo ./bootstrap
sudo ./configure --with-rpi-include-path=/opt/vc/include --with-rpi-lib-path=/opt/vc/lib --enable-rpi
sudo make
```

### Install libcec
We are now ready to install the compiled code so it can be used by the `cec-client`.
```sh
sudo make install
```

Finally we have to run the `ldconfig` command to enable the `cec-client` to use the compiled source.
```sh
sudo ldconfig
```

### Test CEC
Here are some examples of commands which turns the display on or off.
> Remember this only works on displays which supports CEC.

```sh
# turn display off
echo "standby 0" | sudo cec-client -s

# turn display on
echo 'on 0' | sudo cec-client -s
```
