'use client'

import WarningData from "@/app/(user)/warning/components/warning-data";
import WarningHeader from "@/app/(user)/warning/components/warning-header";

export default function WarningComponent() {

    return (
        <div>
            <WarningHeader />
            <div className="p-4">
                <WarningData />
            </div>
        </div>
    )
}
