import React from "react";
import {Group, Text, useMantineTheme} from '@mantine/core';
import {CrossCircledIcon, ImageIcon, UploadIcon} from '@modulz/radix-icons';
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";

function ImageUploadIcon({status, ...props}) {
    if (status.accepted) {
        return <UploadIcon {...props} />;
    }

    if (status.rejected) {
        return <CrossCircledIcon {...props} />;
    }

    return <ImageIcon {...props} />;
}

function getIconColor(status, theme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][6]
        : status.rejected
            ? theme.colors.red[6]
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.black;
}

export default function DropzoneArea({file, setFile, buffer, setBuffer}) {
    const theme = useMantineTheme();

    const captureFile = (file) => {
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))
        }
    }

    return (
        <Dropzone multiple={false}
                  onDrop={(file) => {
                      captureFile(file[0])
                      setFile(file[0])
                  }}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={3 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
        >
            {(status) => (
                <Group position="center" spacing="xl" style={{minHeight: 220, pointerEvents: 'none'}}>
                    <ImageUploadIcon
                        status={status}
                        style={{width: 80, height: 80, color: getIconColor(status, theme)}}
                    />
                    <div>
                        <Text size="xl" inline>
                            Drag image here or click to select file
                        </Text>
                    </div>
                </Group>
            )}
        </Dropzone>
    );
}
