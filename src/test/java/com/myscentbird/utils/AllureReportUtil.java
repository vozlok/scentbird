package com.myscentbird.utils;

import io.qameta.allure.Attachment;

import java.io.IOException;

import static com.codeborne.selenide.Screenshots.takeScreenShotAsFile;
import static com.google.common.io.Files.toByteArray;

class AllureReportUtil {

    @Attachment(value = "Screenshot", type = "image/png")
    public static byte[] attachScreenshot() {
        try {
            return toByteArray(takeScreenShotAsFile());
        } catch (IOException e) {
            return new byte[0];
        }
    }

}
