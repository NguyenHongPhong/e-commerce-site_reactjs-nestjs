import { useState, useEffect } from "react";
import { IAddress } from "@uiTypes/ui";
const API_BASE = "https://provinces.open-api.vn/api/v1";

// Type definitions
export interface Ward {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    district_code: number;
}

export interface District {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    province_code: number;
    wards?: Ward[];
}

export interface Province {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    phone_code: number;
    districts?: District[];
}

export function useAddress({ value, onChange }: { value: IAddress; onChange: (val: IAddress) => void }) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [province, setProvince] = useState<Province | null>(null);
    const [district, setDistrict] = useState<District | null>(null);
    const [ward, setWard] = useState<Ward | null>(null);

    const [street, setStreet] = useState<string>("");

    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    const [error, setError] = useState<string | null>(null);

    // 1. Lấy danh sách tỉnh/thành phố khi hook mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setLoadingProvinces(true);
                const resp = await fetch(`${API_BASE}`);
                if (!resp.ok) throw new Error("Không thể load provinces");
                const data: Province[] = await resp.json();
                setProvinces(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoadingProvinces(false);
            }
        };
        fetchProvinces();
    }, []);

    // 2. Khi province thay đổi → lấy districts
    useEffect(() => {
        if (!province) {
            setDistricts([]);
            setDistrict(null);
            return;
        }
        const fetchDistricts = async () => {
            try {
                setLoadingDistricts(true);
                const resp = await fetch(`${API_BASE}/p/${province.code}?depth=2`);
                if (!resp.ok) throw new Error("Không thể load districts");
                const data: Province = await resp.json();
                const dlist = data.districts || [];
                setDistricts(dlist);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoadingDistricts(false);
            }
        };
        fetchDistricts();
        setDistrict(null);
        setWards([]);
        setWard(null);
    }, [province]);

    // 3. Khi district thay đổi → lấy wards
    useEffect(() => {
        if (!district || !province) {
            setWards([]);
            setWard(null);
            return;
        }
        const fetchWards = async () => {
            try {
                setLoadingWards(true);
                const resp = await fetch(`${API_BASE}/p/${province.code}?depth=3`);
                if (!resp.ok) throw new Error("Không thể load wards");
                const obj: Province = await resp.json();
                const found = obj.districts?.find((d) => d.code === district.code);
                const wlist = found?.wards || [];
                setWards(wlist);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoadingWards(false);
            }
        };
        fetchWards();
        setWard(null);
    }, [district, province]);

    // 4. Hàm thiết lập province / district / ward từ chọn user
    const selectProvince = (provCode: number) => {
        const prov = provinces.find((p) => p.code === provCode) || null;
        const nameProvince = provinces.find(x => x.code === provCode)?.name || "";
        onChange({ ...value, province: nameProvince || "" })
        setProvince(prov);
    };
    const selectDistrict = (distCode: number) => {
        const dist = districts.find((d) => d.code === distCode) || null;
        const nameDistrict = districts.find(x => x.code === distCode)?.name || "";
        onChange({ ...value, district: nameDistrict || "" });
        setDistrict(dist);
    };
    const selectWard = (wardCode: number) => {
        const w = wards.find((w) => w.code === wardCode) || null;
        const nameWard = wards.find(x => x.code === wardCode)?.name || "";
        onChange({ ...value, ward: nameWard || "" });
        setWard(w);
    };

    // 5. Lấy địa chỉ hoàn chỉnh
    const fullAddress = (): string => {
        const parts: string[] = [];
        if (street) parts.push(street);
        if (ward) parts.push(ward.name);
        if (district) parts.push(district.name);
        if (province) parts.push(province.name);
        return parts.join(", ");
    };

    return {
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
    };
}
