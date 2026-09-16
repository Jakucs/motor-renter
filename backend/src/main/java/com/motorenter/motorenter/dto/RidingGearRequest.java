package com.motorenter.motorenter.dto;

public class RidingGearRequest {
    private boolean hasHelmet;
    private boolean hasProtectiveGear;

    public boolean isHasHelmet() {
        return hasHelmet;
    }

    public void setHasHelmet(boolean hasHelmet) {
        this.hasHelmet = hasHelmet;
    }

    public boolean isHasProtectiveGear() {
        return hasProtectiveGear;
    }

    public void setHasProtectiveGear(boolean hasProtectiveGear) {
        this.hasProtectiveGear = hasProtectiveGear;
    }
}