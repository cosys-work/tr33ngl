FROM bitnami/minideb:jessie
COPY leofs-init.sh ./
COPY leofs_1.4.3-1_ubuntu-18.04_amd64.deb ./
VOLUME pVol
RUN ./leofs-init.sh
