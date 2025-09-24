import { useAddress } from "@features/ui/hooks/useAddrress";
import { IAddress } from "@uiTypes/ui";

export default function AddressComponent() {
    const {
        provinces,
        districts,
        wards,
        province,
        district,
        ward,
        street,
        setStreet,
        selectProvince,
        selectDistrict,
        selectWard,
        fullAddress,
        loadingProvinces,
        loadingDistricts,
        loadingWards,
        error,
    } = useAddress();

    return (
        <div>
            {/* Province / City */}
            <div className="mb-3">
                <label className="block mb-1">Province / City:</label>
                <select
                    className="w-full border rounded p-2"
                    value={province?.code || ""}
                    onChange={(e) => selectProvince(Number(e.target.value))}
                    disabled={loadingProvinces}
                >
                    <option value="">Select a province / city</option>
                    {provinces.map((p) => (
                        <option key={p.code} value={p.code}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* District */}
            {province && (
                <div className="mb-3">
                    <label className="block mb-1">District:</label>
                    <select
                        className="w-full border rounded p-2"
                        value={district?.code || ""}
                        onChange={(e) => selectDistrict(Number(e.target.value))}
                        disabled={loadingDistricts}
                    >
                        <option value="">Select a district</option>
                        {districts.map((d) => (
                            <option key={d.code} value={d.code}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Ward / Commune */}
            {district && (
                <div className="mb-3">
                    <label className="block mb-1">Ward / Commune:</label>
                    <select
                        className="w-full border rounded p-2"
                        value={ward?.code || ""}
                        onChange={(e) => selectWard(Number(e.target.value))}
                        disabled={loadingWards}
                    >
                        <option value="">Select a ward / commune</option>
                        {wards.map((w) => (
                            <option key={w.code} value={w.code}>
                                {w.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Street & House Number */}
            {ward && (
                <div className="mb-3">
                    <label className="block mb-1">Street & House Number:</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>
            )}

            {/* Full Address */}
            {street && (
                <div className="font-semibold">
                    Address: {fullAddress()}
                </div>
            )}
        </div>

    )
}