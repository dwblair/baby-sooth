import serial
import subprocess 
import signal
import os

ser=serial.Serial('/dev/ttyACM0',9600)
proc=0
playing=False
cmd = 'ffplay ./river.mp3'

while True:
    line=ser.readline().decode().strip()
    print(line,playing)
    if line=='1' and playing==False:
        pro = subprocess.Popen(cmd,stdout=subprocess.PIPE,shell=True,preexec_fn=os.setsid)
        playing=True
    if line=='0' and playing==True:
        playing=False
        os.killpg(os.getpgid(pro.pid), signal.SIGTERM)

